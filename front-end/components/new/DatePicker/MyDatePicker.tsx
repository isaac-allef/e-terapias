import React from 'react';
import DatePicker from 'react-datepicker';
import br from "date-fns/locale/pt-BR";

import 'react-datepicker/dist/react-datepicker.css';

interface Props {
	selectedDate: Date | undefined;
	onChange: (date: Date) => any;
}

const isFuture = date => {
    const today = new Date();
	if (today.getFullYear() < date.getFullYear()) {
		return false;
	}
	if (today.getMonth() < date.getMonth()) {
		return false;
	}
	if (today.getDate() < date.getDate()) {
		return false;
	}
    return true;
};

const MyDatePicker = ({
	selectedDate,
	onChange,
	...props
}: Props) => {
	return (
	<DatePicker
		selected={selectedDate}
		onChange={onChange}
		filterDate={isFuture}
		locale={br}
		showTimeSelect
		timeFormat='p'
		timeIntervals={15}
		dateFormat='Pp'
		{...props}
    />
  );
};

export default MyDatePicker;