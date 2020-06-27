import React from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  AreaSeries,
  Title,
  Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { ArgumentScale, Animation } from '@devexpress/dx-react-chart';
import { curveCatmullRom, area } from 'd3-shape';
import { scalePoint } from 'd3-scale';

const legendStyles = () => ({
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
});
const legendRootBase = () => <Legend.Root />;
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const legendLabelStyles = () => ({
  label: {
    whiteSpace: 'nowrap',
  },
});
const legendLabelBase = () => <Legend.Label />;
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const chartStyles = () => ({
  chart: {
    'margin-top': '20px',
    padding: '20px',
  },
});

const Area = (props) => (
  <AreaSeries.Path
    {...props}
    path={area()
      .x(({ arg }) => arg)
      .y1(({ val }) => val)
      .y0(({ startVal }) => startVal)
      .curve(curveCatmullRom)}
  />
);

const ChartSplineArea = ({ classes, title, data, valueField, argumentField, name }) => {
  return (
    <Paper>
      <Chart data={data} className={classes.chart}>
        <ArgumentScale factory={scalePoint} />
        <ArgumentAxis />
        <ValueAxis />
        <AreaSeries
          valueField={valueField}
          name={name}
          argumentField={argumentField}
          seriesComponent={Area}
        />
        <Animation />
        <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
        <Title text={title} />
      </Chart>
    </Paper>
  );
};

ChartSplineArea.propTypes = {
  title: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  valueField: PropTypes.string.isRequired,
  argumentField: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withStyles(chartStyles, { name: 'ChartSplineArea' })(ChartSplineArea);
