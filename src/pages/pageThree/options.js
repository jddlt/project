export default {
  options1: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
      type: 'category',
      name: 'V(m/s)'
    },
    series: [{
      data: ['V1', 'V1'],
      type: 'line'
    }]
  },
  options2: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
      type: 'category',
      name: 'V(m/s)'
    },
    series: [{
      data: ['V1 / V2', 'V1 / V2'],
      type: 'line'
    }]
  },
  options3: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
      type: 'category',
      name: 'V(m/s)'
    },
    series: [
      {
        data: ['V1', 'V1'],
        type: 'line'
      },
      {
        data: ['V2', 'V2'],
        type: 'line'
      }
    ]
  },
  options4: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
      type: 'category',
      name: 'V(m/s)'
    },
    series: [
      {
        data: ['V1', 'V1', 'V1', 'V1', 'V1'],
        type: 'line'
      },
      {
        data: ['V2', 'V2', 'V1'],
        type: 'line'
      }
    ]
  },
  options5: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
        type: 'category',
        name: 'V(m/s)',
        data: [0, '', '',  'V1/V2', ''],
        boundaryGap: false,
    },
    series: [
        {
            data: ['V1/V2', 'V1/V2', 0, 0],
            type: 'line'
        },
        {
            data: ['V1/V2', 'V1/V2'],
            type: 'line'
        }

    ]
  },
  options6: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
        type: 'category',
        name: 'V(m/s)',
        data: ['V1', '', ' ', '', 'V2', ''],
        boundaryGap: false,
    },
    series: [
        {
            data: ['V2', ' ', 'V1'],
            type: 'line'
        },
        {
            data: ['V1', ' ', "", ""],
            type: 'line'
        }

    ]
  },
  options7: {
    xAxis: {
      type: 'category',
      data: [],
      boundaryGap: false,
      name: 't/s'
    },
    yAxis: {
        type: 'category',
        name: 'V(m/s)',
        data: [0, 'V', '', '', '', '', '', ''],
        boundaryGap: false,
    },
    series: [
        {
            data: [0, 'V', 'V','V', 0, 0, 'V', 'V','V', 0, 0, 'V', 'V','V','V', 0 ],
            type: 'line'
        }

    ]
  },

}