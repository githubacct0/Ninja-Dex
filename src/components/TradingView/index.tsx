import * as React from 'react';
import './index.css';
import {
  widget,
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  ResolutionString,
} from '../../charting_library'; // Make sure to follow step 1 of the README
import { useMarket } from '../../utils/markets';
import { BONFIDA_DATA_FEED } from '../../utils/bonfidaConnector';
import { findTVMarketFromAddress } from '../../utils/tradingview';

// This is a basic example of how to create a TV widget
// You can add more feature such as storing charts in localStorage

export interface ChartContainerProps {
  symbol: ChartingLibraryWidgetOptions['symbol'];
  interval: ChartingLibraryWidgetOptions['interval'];
  datafeedUrl: string;
  libraryPath: ChartingLibraryWidgetOptions['library_path'];
  chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'];
  chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'];
  clientId: ChartingLibraryWidgetOptions['client_id'];
  userId: ChartingLibraryWidgetOptions['user_id'];
  fullscreen: ChartingLibraryWidgetOptions['fullscreen'];
  autosize: ChartingLibraryWidgetOptions['autosize'];
  studiesOverrides: ChartingLibraryWidgetOptions['studies_overrides'];
  containerId: ChartingLibraryWidgetOptions['container_id'];
  theme: string;
}

export interface ChartContainerState {}

export const TVChartContainer = () => {
  // @ts-ignore
  const defaultProps: ChartContainerProps = {
    symbol: 'NINJA/USDC',
    interval: '240' as ResolutionString,
    theme: 'Dark',
    containerId: 'tv_chart_container',
    datafeedUrl: BONFIDA_DATA_FEED,
    libraryPath: '/charting_library/',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };

  const tvWidgetRef = React.useRef<IChartingLibraryWidget | null>(null);
  const { market, marketName } = useMarket();

  let parsedMarketName;
  switch (marketName) {
    case 'BTC/WUSDT':
      parsedMarketName = 'BTC/USDT';
      break;
    case 'ETH/WUSDT':
      parsedMarketName = 'ETH/USDT';
      break;
    default:
      parsedMarketName = marketName;
  }

  React.useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: marketName,
      // BEWARE: no trailing slash is expected in feed URL
      // tslint:disable-next-line:no-any
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        defaultProps.datafeedUrl,
      ),
      interval: defaultProps.interval as ChartingLibraryWidgetOptions['interval'],
      container_id: defaultProps.containerId as ChartingLibraryWidgetOptions['container_id'],
      library_path: defaultProps.libraryPath as string,
      locale: 'en',
      disabled_features: [
        'use_localstorage_for_settings',
        'timeframes_toolbar',
        'show_logo_on_all_charts',
        'header_compare',
        'compare_symbol',
        'header_symbol_search'
        ],

      load_last_chart: true,
      client_id: defaultProps.clientId,
      user_id: defaultProps.userId,
      fullscreen: defaultProps.fullscreen,
      height: '100%',
      width: '100%',
      studies_overrides: defaultProps.studiesOverrides,
      theme: 'Dark',
      // toolbar_bg:'#303034',
      overrides: {
        // 'paneProperties.background': '#1d1f29',
        'mainSeriesProperties.candleStyle.upColor': '#0EE9A7',
        'mainSeriesProperties.candleStyle.downColor': '#FF4747',
        'mainSeriesProperties.candleStyle.drawWick': true,
        'mainSeriesProperties.candleStyle.drawBorder': true,
        'mainSeriesProperties.candleStyle.borderColor': '#0EE9A7',
        'mainSeriesProperties.candleStyle.borderUpColor': '#0EE9A7',
        'mainSeriesProperties.candleStyle.borderDownColor': '#FF4747',
        'mainSeriesProperties.candleStyle.wickUpColor': '#0EE9A7',
        'mainSeriesProperties.candleStyle.wickDownColor': '#FF4747',
      },
      custom_css_url: '/charting_library/custom.css',
    };

    const tvWidget = new widget(widgetOptions);
    tvWidgetRef.current = tvWidget;

    tvWidget.onChartReady(() => {
      tvWidget.headerReady().then(() => {
        const button = tvWidget.createButton();
        button.setAttribute('title', 'Click to show a notification popup');
        button.classList.add('apply-common-tooltip');
        button.addEventListener('click', () =>
          tvWidget.showNoticeDialog({
            title: 'Notification',
            body: 'TradingView Charting Library API works correctly',
            callback: () => {
              console.log('It works!!');
            },
          }),
        );
        button.innerHTML = 'Check API';
      });
    });
  }, [market]);

  return <div id={defaultProps.containerId} className="tradingview-chart" />;
};
