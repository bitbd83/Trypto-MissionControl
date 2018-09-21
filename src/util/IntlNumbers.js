import React from 'react';
import {
  FormattedNumber,
  injectIntl
} from 'react-intl';


const InjectNumber = props => < FormattedNumber { ...props
}
/>;
export default injectIntl(InjectNumber, {
  withRef: false
});