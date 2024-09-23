const {BetaAnalyticsDataClient} = require('@google-analytics/data');

async function runReport() {
  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: './ga-key.json' // JSON 키 파일의 경로
    });

    console.log('Client created successfully');

    const [response] = await analyticsDataClient.runReport({
      property: 'properties/459715601', // 여기에 귀하의 10자리 속성 ID를 입력하세요
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        {name: 'activeUsers'},
        {name: 'screenPageViews'},
      ],
    });

    console.log('Report result:');
    console.log(JSON.stringify(response, null, 2));

    const result = {
      activeUsers: response.rows[0].metricValues[0].value,
      pageViews: response.rows[0].metricValues[1].value,
    };

    console.log('Simplified result:');
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Error details:', error);
  }
}

runReport();