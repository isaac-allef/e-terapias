import React from 'react';
import DatePicker from 'react-datepicker';
import br from "date-fns/locale/pt-BR";

import 'react-datepicker/dist/react-datepicker.css';
import { Input } from '@chakra-ui/input';

interface Props {
	selectedDate: Date | undefined;
	onChange: (date: Date) => any;
}

const isWeekday = (date) => {
	const day = date.getDay();
	return day !== 0 && day !== 6;
};

const MyDatePicker = ({
	selectedDate,
	onChange,
	...props
}) => {
	return (
	<DatePicker
		selected={selectedDate}
		onChange={onChange}
		filterDate={isWeekday}
		maxDate={new Date()}
		locale={br}
		showTimeSelect
		timeFormat='p'
		timeIntervals={15}
		dateFormat='Pp'
		{...props}
		customInput={<Input borderLeftRadius={0} />}
    />
  );
};

export default MyDatePicker;