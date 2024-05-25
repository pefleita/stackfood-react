import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import moment from "moment";
import { RTL } from "../RTL/RTL";
const Calendar = ({ handleValue, minDate, maxDate, diffStartEnd }) => {

    const today = new Date();
    const [state, setState] = useState([
        {
            startDate: moment(minDate).toDate(),
            endDate: moment(maxDate).toDate(),
            key: "selection"
        }
    ]);

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        setState([selection]);
    };
    useEffect(() => {
        if (state[0]?.startDate && state[0]?.endDate) {
            const startDate = moment(state[0]?.startDate);
            const endDate = moment(state[0]?.endDate);
            if (!startDate.isSame(endDate)) {
                handleValue?.(state);
            }
        }
    }, [state]);

    return (
        <RTL direction={'ltr'}>
            {minDate && maxDate ? (
                <DateRangePicker
                    onChange={handleOnChange}
                    showSelectionPreview={false}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={state}
                    direction="horizontal"
                    minDate={moment(minDate).toDate()}
                    maxDate={moment(maxDate).toDate()}
                />
            ) : (<DateRangePicker
                onChange={handleOnChange}
                showSelectionPreview={false}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={state}
                direction="horizontal"
                minDate={today}
            />)}
        </RTL>

    );
};

Calendar.propTypes = {
    onChange: PropTypes.func,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date)
};

export default Calendar;
