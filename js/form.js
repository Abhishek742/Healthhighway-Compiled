//custom onsite-form functions
//the only difference is 'stage' and 'state'

//initialization
const atc_btn = document.querySelector('#addtocart')
const main_form = document.querySelector('.os-form')

let problem = document.querySelector('#osf-problem').value;
let currDate = ""



//buttons
const osf_ailBtns = document.querySelectorAll('.osf-ail')
const osf_serviceBtns = document.querySelectorAll('.osf-service')
const osf_timingBtns = document.querySelectorAll('.osf-timing')
const osf_healBtn = document.querySelector('.osf-heal')
const osf_notSureBtn = document.querySelector('.osf-ns') //used
const osf_backBtn = document.querySelector('.osf-back-button')
const osf_finalBtn = document.querySelector('.final-btn')
const osf_payBtn = document.querySelector('#payNow')

//stages
const osf_stages = document.querySelectorAll('.osf-content') //used
const osf_service = document.querySelector('#choose-service') //used
const osf_ailments = document.querySelector('#choose-ailment') //used
const osf_problem = document.querySelector('#not-sure') //used
const osf_contact = document.querySelector('#provide-contact') //used 
const osf_timing = document.querySelector('#choose-timing') //used
const osf_basicInfo = document.querySelector('#basic-info') //used
const osf_days = document.querySelector('#choose-days') //used
const osf_calendar = document.querySelector('#fitness-calendar') //used
const osf_final = document.querySelector('#final-card') //used


//forms
const osf_form_problem = document.querySelector('.osf-form-problem') //used
const osf_form_basic = document.querySelector('.osf-form-basicinfo') //used
const osf_form_contact = document.querySelector('.osf-form-contact') //used
const osf_form_timing = document.querySelector('.time-grid') //used
const osf_form_days = document.querySelector('.day-grid') //used



//other
const buttonsdiv = document.querySelector('.buttttons') //used


// btn event listeners
atc_btn.addEventListener('click', () => { //makes form modal visible
    document.querySelector('.container-for-form').classList.add('active')
    main_form.style.display = "grid"
})

for (let btn of osf_ailBtns) {
    btn.addEventListener('click', () => {
        osf_goToStage(osf_basicInfo)
    })
}
for (let btn of osf_serviceBtns) {
    btn.addEventListener('click', () => {
        osf_goToStage(osf_basicInfo)
    })
}


////Checkboxes validation (copied from the internet)
(function() {
    const form = document.querySelector('.day-grid');
    const checkboxes = form.querySelectorAll('input[type=checkbox]');
    const checkboxLength = checkboxes.length;
    const firstCheckbox = checkboxLength > 0 ? checkboxes[0] : null;

    function init() {
        if (firstCheckbox) {
            for (let i = 0; i < checkboxLength; i++) {
                checkboxes[i].addEventListener('change', checkValidity);
            }

            checkValidity();
        }
    }

    function isChecked() {
        for (let i = 0; i < checkboxLength; i++) {
            if (checkboxes[i].checked) return true;
        }

        return false;
    }

    function checkValidity() {
        const errorMessage = !isChecked() ? 'At least one checkbox must be selected.' : '';
        firstCheckbox.setCustomValidity(errorMessage);
    }

    init();
})();

////

osf_healBtn.addEventListener('click', () => {
    osf_goToStage(osf_ailments)
})

osf_notSureBtn.addEventListener('click', () => {
    osf_goToStage(osf_problem)
})

osf_backBtn.addEventListener('click', () => {
    if (osf_isActive(osf_final)) {
        osf_goToStage(osf_calendar)
    } else if (osf_isActive(osf_calendar)) {
        osf_goToStage(osf_days);
    } else if (osf_isActive(osf_days)) {
        osf_goToStage(osf_timing)
    } else if (osf_isActive(osf_timing)) {
        osf_goToStage(osf_contact)
    } else if (osf_isActive(osf_contact)) {
        osf_goToStage(osf_basicInfo)
    } else if (osf_isActive(osf_basicInfo)) {
        osf_goToStage(osf_service)
    } else if (osf_isActive(osf_problem)) {
        osf_goToStage(osf_service)
    } else if (osf_isActive(osf_service)) {
        document.querySelector('.container-for-form').classList.remove('active')
    }

})
osf_finalBtn.addEventListener('click', () => {
    updating();
    if (currDate === "" || currDate === "Invalid Date" || currDate === undefined) {
        document.getElementById('osf-invalid-date').style.display = "block"
    } else(
        osf_goToStage(osf_final))
})


// form event listeners
osf_form_problem.addEventListener('submit', (e) => {
    e.preventDefault();
    let problemcustom = document.getElementById("osf-problem").value;
    if (problemcustom.length <= 2) {
        document.getElementById('osf-invalid-problem').style.display = "block";
    } else {
        osf_goToStage(osf_basicInfo)
    }
    problem = document.querySelector('#osf-problem').value

})
osf_form_basic.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = document.getElementById("osf-name").value;
    let age = document.getElementById("osf-age").value;
    let weight = document.getElementById("osf-weight").value;
    let height = document.getElementById("osf-height").value;
    if (name.length <= 2) {
        document.getElementById('osf-invalid-name').style.display = "block";
    }
    if (age.length == 0 || Number(age) <= 0 || Number(age) > 100 || isNaN(age)) {
        document.getElementById('osf-invalid-age').style.display = "block";
    }
    if (weight.length == 0 || Number(weight) <= 0 || isNaN(weight)) {
        document.getElementById('osf-invalid-weight').style.display = "block";
    }
    if (height.length == 0 || Number(height) <= 0 || isNaN(height)) {
        document.getElementById('osf-invalid-height').style.display = "block";
    } else {
        osf_goToStage(osf_contact)
    }

})
osf_form_contact.addEventListener('submit', (e) => {
    e.preventDefault();
    let contact = document.getElementById("osf-contact").value;
    let phoneno = /^[0-9]{10}$/;
    if (!contact.match(phoneno)) {
        document.getElementById('osf-invalid-contact').style.display = "block";
    } else { osf_goToStage(osf_timing) }
})
osf_form_timing.addEventListener('submit', (e) => {
    e.preventDefault();
    osf_goToStage(osf_days)
})
osf_form_days.addEventListener('submit', (e) => {
    e.preventDefault();
    osf_goToStage(osf_calendar)
})





// functions
function osf_isActive(stage_name) {
    if (stage_name.classList.contains('active-state')) {
        return true
    } else {
        return false
    }
}


function osf_goToStage(stage_name, percent) {
    if (!stage_name.classList.contains('active-state')) {
        osf_stages.forEach((stage) => stage.classList.remove('active-state'));
        stage_name.classList.add('active-state');

    }
    if (!osf_service.classList.contains('active-state')) {
        osf_service.style.display = "none"
    } else if (osf_service.classList.contains('active-state')) {
        osf_service.style.display = "flex"
    }




    // customProgressBar.style.minWidth = percent

}






function updating() {
    //inputs
    let name = document.querySelector('#osf-name').value
    let age = document.querySelector('#osf-age').value
    let weight = document.querySelector('#osf-weight').value;
    let height = document.querySelector('#osf-height').value
    let contact = document.querySelector('#osf-contact').value

    //spans
    document.querySelector('#f-height').innerHTML = height
    document.querySelector('#f-weight').innerHTML = weight
    document.querySelector('#f-name').innerHTML = name
    document.querySelector('#f-age').innerHTML = age
    document.querySelector('#f-contact').innerHTML = contact

    //days
    var checkboxes = document.getElementsByName('days');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            let value = document.createElement('span')
            document.querySelector('#f-days').appendChild(value).innerHTML = checkbox.value + ", ";
        }
    })


    //date
    document.getElementById("f-date").innerHTML = currDate.toString().substring(0, 15);


    //time
    var timings = document.getElementsByName('timing');
    for (i = 0; i < timings.length; i++) {
        if (timings[i].checked)
            document.getElementById("f-time").innerHTML = timings[i].value;
    }
    //problem
    document.querySelector('#f-problem').innerHTML = problem;


    //trainer
    var ele = document.getElementsByName('trainer');
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            document.getElementById("f-pref").innerHTML = ele[i].value;
    }


}








////////    CALENDAR STARTS HERE 

/*!
 * calendar 0.1.0
 *
 * @license MIT
 * @author Justinas Bei
 */
(function(root, window, document, factory, undefined) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function() {
            root.TavoCalendar = factory(window, document);
            return root.TavoCalendar;
        });
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS.
        module.exports = factory(window, document);
    } else {
        // Browser globals.
        window.TavoCalendar = factory(window, document);
    }
})(this, window, document, function(window, document) {
    'use strict';

    var CLASS_CALENDAR = "tavo-calendar";
    var CLASS_CALENDAR_INFO = "tavo-calendar__info";
    var CLASS_CALENDAR_CODE = "tavo-calendar__code";
    var CLASS_CALENDAR_CODE_LOCK = "tavo-calendar__code_lock";
    var CLASS_CALENDAR_HEADER = "tavo-calendar__header";
    var CLASS_CALENDAR_NAV = "tavo-calendar__nav";
    var CLASS_CALENDAR_NAV_PREV = "tavo-calendar__nav_prev";
    var CLASS_CALENDAR_NAV_NEXT = "tavo-calendar__nav_next";
    var CLASS_CALENDAR_RESET = "tavo-calendar__reset";
    var CLASS_CALENDAR_SELECT_DATE = "tavo-calendar__select-date";
    var CLASS_CALENDAR_SELECT_START = "tavo-calendar__select-start";
    var CLASS_CALENDAR_SELECT_END = "tavo-calendar__select-end";
    var CLASS_CALENDAR_WEEK_NAMES = "tavo-calendar__week-names";
    var CLASS_CALENDAR_WEEKDAY = 'tavo-calendar__weekday'
    var CLASS_CALENDAR_MONTH = "tavo-calendar__month-label";
    var CLASS_CALENDAR_DAYS = "tavo-calendar__days";
    var CLASS_CALENDAR_DAY = "tavo-calendar__day";
    var CLASS_CALENDAR_INNER = "tavo-calendar__day-inner";
    var CLASS_CALENDAR_DAY_REL_FUTURE = "tavo-calendar__day_rel-future";
    var CLASS_CALENDAR_DAY_REL_PAST = "tavo-calendar__day_rel-past";
    var CLASS_CALENDAR_DAY_REL_TODAY = "tavo-calendar__day_rel-today";
    var CLASS_CALENDAR_DAY_ABS_PAST = "tavo-calendar__day_abs-past";
    var CLASS_CALENDAR_DAY_ABS_FUTURE = "tavo-calendar__day_abs-future";
    var CLASS_CALENDAR_DAY_ABS_TODAY = "tavo-calendar__day_abs-today";
    var CLASS_CALENDAR_DAY_SELECT = "tavo-calendar__day_select";
    var CLASS_CALENDAR_DAY_RANGE_SELECT = "tavo-calendar__day_range-select";
    var CLASS_CALENDAR_DAY_RANGE_START = "tavo-calendar__day_range-start";
    var CLASS_CALENDAR_DAY_RANGE_END = "tavo-calendar__day_range-end";
    var CLASS_CALENDAR_DAY_OFF = "tavo-calendar__day_off";
    var CLASS_CALENDAR_DAY_LOCK = "tavo-calendar__day_lock";
    var CLASS_CALENDAR_DAY_DIFFERENT_MONTH = "tavo-calendar__day_different-month";
    var CLASS_CALENDAR_DAY_HIGHTLIGHT = "tavo-calendar__day_highlight";


    function showError(type, text) {
        window.console && window.console[type] && window.console[type]('TavoCalendar: ' + text);
    }

    function getDummyDay() {
        var dummy_day_el, dummy_day_wrapper_el;

        dummy_day_wrapper_el = document.createElement('span');
        dummy_day_wrapper_el.className = CLASS_CALENDAR_DAY + " " + CLASS_CALENDAR_DAY_DIFFERENT_MONTH;

        dummy_day_el = document.createElement("span");
        dummy_day_el.className = CLASS_CALENDAR_INNER;
        dummy_day_el.textContent = "-";

        dummy_day_wrapper_el.appendChild(dummy_day_el);

        return dummy_day_wrapper_el;
    }

    var MOMENT_F_MONTH = "MMMM, YYYY";
    var MOMENT_F = 'YYYY-MM-DD'

    var options_default = {
        format: MOMENT_F,
        locale: 'en',
        date: null,
        date_start: null,
        date_end: null,
        selected: [ /*2012-12-10, 2012-12-11*/ ],
        highlight: [ /*2012-12-23*/ ],
        blacklist: [ /*2012-12-24*/ ],
        range_select: false,
        multi_select: false,
        future_select: true,
        past_select: false,
        frozen: false,
        highlight_sunday: true,
        highlight_saturday: false
    }

    var TavoCalendar = function(container_q, user_options) {
        const moment = window.moment || user_options.moment

        if (!moment) {
            showError('error', 'moment.js library missing!');
            return;
        }

        this.elements = {}

        if (container_q instanceof Element) {
            this.elements.wrapper = container_q;
        } else {
            const wrapper_el = document.querySelector(container_q);

            if (wrapper_el) {
                this.elements.wrapper = wrapper_el;
            } else {
                showError('warn', "Element does not exist!");
                return;
            }
        }

        this.elements.wrapper.classList.add(CLASS_CALENDAR);

        // Extend defaults with user preference
        const config = Object.assign({}, options_default, user_options);

        this.state = {
            highlight: config.highlight ? config.highlight : [],
            blacklist: config.blacklist ? config.blacklist : [],
            date_start: config.date_start,
            date_end: config.date_end,
            lock: config.lock || config.frozen
        }

        if (Array.isArray(config.selected)) {
            this.state.selected = config.selected ? config.selected : []
        } else {
            this.state.selected = config.selected ? [config.selected] : []
        }

        let calnedar_moment;

        if (config.date) {
            calnedar_moment = moment(config.date, config.format);
        } else {
            calnedar_moment = moment();
        }

        this.state.date = calnedar_moment.format(config.format);

        calnedar_moment.locale(config.locale);

        this.locale_data = calnedar_moment.localeData();

        this.moment = calnedar_moment;

        this.config = config;

        this.mount();
        this.bindEvents();
    }

    TavoCalendar.prototype.mount = function() {
        var calendar_info_el, calendar_code_el;

        // Info
        var calendar_reset_el, calendar_select_date_el, calendar_select_date_start_el, calendar_select_date_end_el;

        // Code Header
        var calendar_header_el, calendar_month_el, calendar_nav_prev_el, calendar_nav_next_el;

        // Code Days
        var calendar_week_names_el, calendar_days_el;

        //Calendar info
        calendar_info_el = document.createElement('div')
        calendar_info_el.className = CLASS_CALENDAR_INFO;

        if (this.state.date_start) {
            calendar_info_el.style.display = "block";
        } else {
            calendar_info_el.style.display = "none";
        }

        //Calendar code
        calendar_code_el = document.createElement('div');

        if (this.state.lock) {
            calendar_code_el.className = CLASS_CALENDAR_CODE + " " + CLASS_CALENDAR_CODE_LOCK;
        } else {
            calendar_code_el.className = CLASS_CALENDAR_CODE;
        }

        //Calendar header
        calendar_header_el = document.createElement('div');
        calendar_header_el.className = CLASS_CALENDAR_HEADER;

        calendar_month_el = document.createElement('span');
        calendar_month_el.className = CLASS_CALENDAR_MONTH;
        calendar_month_el.textContent = this.moment.format(MOMENT_F_MONTH);

        calendar_nav_prev_el = document.createElement('span');
        calendar_nav_prev_el.className = CLASS_CALENDAR_NAV_PREV + " " + CLASS_CALENDAR_NAV;
        calendar_nav_prev_el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/></svg>';

        calendar_nav_next_el = document.createElement('span');
        calendar_nav_next_el.className = CLASS_CALENDAR_NAV_NEXT + " " + CLASS_CALENDAR_NAV;
        calendar_nav_next_el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/></svg>';

        calendar_header_el.appendChild(calendar_nav_prev_el)
        calendar_header_el.appendChild(calendar_month_el)
        calendar_header_el.appendChild(calendar_nav_next_el)

        calendar_week_names_el = document.createElement('div');
        calendar_week_names_el.className = CLASS_CALENDAR_WEEK_NAMES;

        var weekday_elems = [];

        for (var i = 1; i < 7; i++) {
            var weekday_el;

            weekday_el = document.createElement("span");
            weekday_el.className = CLASS_CALENDAR_WEEKDAY;
            weekday_el.textContent = this.locale_data.weekdaysShort()[i];

            weekday_elems.push(weekday_el);
        }

        var sunday_el;

        sunday_el = document.createElement("span");
        sunday_el.className = CLASS_CALENDAR_WEEKDAY;
        sunday_el.textContent = this.locale_data.weekdaysShort()[0];

        if (this.locale_data.firstDayOfWeek() == 0) {
            weekday_elems.unshift(sunday_el)
        } else {
            weekday_elems.push(sunday_el)
        }

        weekday_elems.map(function(weekday) {
            calendar_week_names_el.appendChild(weekday)
        });

        calendar_days_el = document.createElement("div");
        calendar_days_el.className = CLASS_CALENDAR_DAYS;

        const moment_copy = this.moment.clone();

        moment_copy.startOf('month');

        // Not always start of the month matches start of the week
        let offset = moment_copy.isoWeekday() % (7 + this.locale_data.firstDayOfWeek());

        if (offset > 0) {
            for (var i = this.locale_data.firstDayOfWeek(); i < offset; i++) {
                calendar_days_el.appendChild(getDummyDay());
            }
        }

        var year = moment_copy.year();
        var month = moment_copy.month();
        var days_in_month = moment_copy.daysInMonth();

        for (var d = 1; d <= days_in_month; d++) {
            var day_el, day_wrapper_el;

            day_wrapper_el = document.createElement("span");
            day_wrapper_el.className = CLASS_CALENDAR_DAY;

            day_el = document.createElement("span");
            day_el.className = CLASS_CALENDAR_INNER;

            const that = this;
            const date = moment_copy.format(that.config.format);

            day_wrapper_el.addEventListener('click', function(ev) {
                that.dayClick(date, ev.currentTarget)
            }, true);

            day_el.textContent = d;

            //ABSOLUTE RELATIONS
            if (moment_copy.isSame(moment(), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_ABS_TODAY;
            } else if (moment_copy.isBefore(moment(), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_ABS_PAST;
            } else if (moment_copy.isAfter(moment(), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_ABS_FUTURE;
            }

            //RELATIVE RELATIONS
            if (moment_copy.isSame(moment(this.state.date, this.config.format), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_REL_TODAY;
            } else if (moment_copy.isBefore(moment(this.state.date, this.config.format), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_REL_PAST;
            } else if (moment_copy.isAfter(moment(this.state.date, this.config.format), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_REL_FUTURE;
            }

            //MEANINGFUL MARKERS
            if (this.state.highlight.indexOf(moment_copy.format(this.config.format)) > -1) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_HIGHTLIGHT;
            }

            if (this.config.highlight_saturday && moment_copy.isoWeekday() === 6) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_HIGHTLIGHT;
            }

            if (this.config.highlight_sunday && moment_copy.isoWeekday() === 7) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_HIGHTLIGHT;
            }

            if (this.state.blacklist.indexOf(moment_copy.format(this.config.format)) > -1) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_OFF + " " + CLASS_CALENDAR_DAY_LOCK;
            }

            if (this.state.selected.indexOf(moment_copy.format(this.config.format)) > -1) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_SELECT
            }

            //Range select
            if (this.state.date_start && moment_copy.isSame(this.state.date_start, 'day')) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_RANGE_START + " " + CLASS_CALENDAR_DAY_RANGE_SELECT + " " + CLASS_CALENDAR_DAY_SELECT;
            }

            if (this.state.date_start && !this.state.date_end && moment_copy.isBefore(moment(this.state.date_start, this.config.format), "day")) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_LOCK
            }

            if (this.state.date_end && moment_copy.isSame(this.state.date_end, 'day')) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_RANGE_END + " " + CLASS_CALENDAR_DAY_RANGE_SELECT + " " + CLASS_CALENDAR_DAY_SELECT;
            }

            if ((this.state.date_start && this.state.date_end && moment_copy.isBetween(moment(this.state.date_start, this.config.format), moment(this.state.date_end, this.config.format), 'day'))) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_SELECT + " " + CLASS_CALENDAR_DAY_RANGE_SELECT
            }

            //Lock days
            if ((moment_copy.isBefore(moment(this.state.date, this.config.format), "day") && !this.config.past_select) || (moment_copy.isAfter(moment(this.state.date, this.config.format), "day") && !this.config.future_select)) {
                day_wrapper_el.className = day_wrapper_el.className + " " + CLASS_CALENDAR_DAY_LOCK
            }

            day_wrapper_el.appendChild(day_el);
            calendar_days_el.appendChild(day_wrapper_el);

            moment_copy.add(1, "d");
        }

        // set back fot future use
        moment_copy.year(year).month(month);
        moment_copy.endOf('month');

        for (var i = 0; i < (6 - moment_copy.day()); i++) {
            calendar_days_el.appendChild(getDummyDay());
        }

        if (this.locale_data.firstDayOfWeek() == 1) {
            calendar_days_el.appendChild(getDummyDay());
        }

        calendar_code_el.appendChild(calendar_header_el);
        calendar_code_el.appendChild(calendar_week_names_el);
        calendar_code_el.appendChild(calendar_days_el);

        calendar_select_date_el = document.createElement("span");
        calendar_select_date_start_el = document.createElement("span");
        calendar_select_date_end_el = document.createElement("span");
        calendar_reset_el = document.createElement("button");

        calendar_select_date_el.className = CLASS_CALENDAR_SELECT_DATE;
        calendar_select_date_start_el.className = CLASS_CALENDAR_SELECT_START;
        calendar_select_date_end_el.className = CLASS_CALENDAR_SELECT_END;

        if (this.state.day) {
            calendar_select_date_el.textContent = this.moment.format(this.config.format);
        }

        if (this.state.date_start) {
            calendar_select_date_start_el.textContent = this.state.date_start;
        }

        if (this.state.date_end) {
            calendar_select_date_end_el.textContent = this.state.date_end;
        }

        calendar_reset_el.className = CLASS_CALENDAR_RESET + ' button';
        calendar_reset_el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M311.7 374.7l-17 17c-4.7 4.7-12.3 4.7-17 0L224 337.9l-53.7 53.7c-4.7 4.7-12.3 4.7-17 0l-17-17c-4.7-4.7-4.7-12.3 0-17l53.7-53.7-53.7-53.7c-4.7-4.7-4.7-12.3 0-17l17-17c4.7-4.7 12.3-4.7 17 0l53.7 53.7 53.7-53.7c4.7-4.7 12.3-4.7 17 0l17 17c4.7 4.7 4.7 12.3 0 17L257.9 304l53.7 53.7c4.8 4.7 4.8 12.3.1 17zM448 112v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h48V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h128V12c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h48c26.5 0 48 21.5 48 48zm-48 346V160H48v298c0 3.3 2.7 6 6 6h340c3.3 0 6-2.7 6-6z"/></svg>';

        if (this.state.date_start && this.state.date_end) {
            calendar_info_el.appendChild(calendar_select_date_start_el);
            calendar_info_el.appendChild(document.createTextNode(" - "));
            calendar_info_el.appendChild(calendar_select_date_end_el);

            calendar_info_el.appendChild(calendar_reset_el);
        } else if (this.config.range && this.state.date_start) {
            calendar_info_el.appendChild(calendar_select_date_start_el);
            calendar_info_el.appendChild(document.createTextNode(" - "));

            calendar_info_el.appendChild(calendar_reset_el);
        } else if (this.state.day) {
            calendar_info_el.appendChild(calendar_select_date_el);

            calendar_info_el.appendChild(calendar_reset_el);
        }

        this.elements.wrapper.appendChild(calendar_info_el)
        this.elements.wrapper.appendChild(calendar_code_el);

        this.elements.calendar_select_date = calendar_select_date_el
        this.elements.calendar_select_date_start = calendar_select_date_start_el
        this.elements.calendar_select_date_end = calendar_select_date_end_el
        this.elements.calendar_info = calendar_info_el;
        this.elements.calendar_code = calendar_code_el;
        this.elements.calendar_reset = calendar_reset_el;
        this.elements.calendar_nav_prev = calendar_nav_prev_el;
        this.elements.calendar_nav_next = calendar_nav_next_el;
    }

    TavoCalendar.prototype.dayClick = function(date, day_el) {
        if (this.config.frozen) return;

        //Day lock
        if (day_el.classList.contains(CLASS_CALENDAR_DAY_LOCK)) return;

        if (this.config.range_select) {
            if ((!this.state.date_start && !this.state.date_end) || (this.state.date_start && this.state.date_end)) {
                this.state.date_start = date;
                this.state.date_end = null;
            } else {
                if (!this.state.date_end) {
                    this.state.date_end = date
                }

                this.state.lock = true;
                this.elements.wrapper.dispatchEvent(new Event('calendar-range'))
            }
        } else {
            if (this.config.multi_select) {
                if (this.state.selected.indexOf(date) > -1) {
                    this.state.selected = this.state.selected.filter(date_selected => date_selected != date);
                } else {
                    this.state.selected.push(date);
                }
            } else {
                this.state.selected = [date];
            }

            this.elements.wrapper.dispatchEvent(new Event('calendar-select'))
        }

        this.destroy()
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.getSelected = function() {
        if (this.config.multi_select) {
            return this.state.selected;
        }

        return this.state.selected ? this.state.selected[this.state.selected.length - 1] : null;
    }

    TavoCalendar.prototype.getStartDate = function() {
        return this.state.date_start;
    }

    TavoCalendar.prototype.setStartDate = function(date) {
        this.state.date_start = date;

        this.destroy()
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.getEndDate = function() {
        return this.state.date_end;
    }

    TavoCalendar.prototype.setEndDate = function(date) {
        this.state.date_end = date
    }

    TavoCalendar.prototype.getRange = function() {
        return {
            start: this.state.date_start,
            end: this.state.date_end
        };
    }

    TavoCalendar.prototype.setRange = function(date1, date2) {
        this.state.date_start = date1
        this.state.date_end = date2

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.setFocusDate = function(date) {
        this.moment = moment(date);

        this.config.date = this.moment.format('YYYY-MM-DD');

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.getFocusYear = function() {
        return this.moment.format('YYYY');
    }

    TavoCalendar.prototype.setFocusYear = function(y) {
        this.moment.set('year', y);

        this.config.date = this.moment.format('YYYY-MM-DD');

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.getFocusMonth = function() {
        return this.moment.format('MM')
    }

    TavoCalendar.prototype.setFocusMonth = function(m) {
        var month = Number.parseInt(m);

        if (Number.isNaN(month)) {
            throw new Error('Invalid month.');
        }

        this.moment.set('month', month == 0 ? 0 : month - 1);

        this.config.date = this.moment.format('YYYY-MM-DD');

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.getFocusDay = function() {
        this.moment.format('DD');
    }

    TavoCalendar.prototype.getConfig = function() {
        return this.config;
    }

    TavoCalendar.prototype.setConfig = function(config) {
        this.config = Object.assign({}, this.config, config);
    }

    TavoCalendar.prototype.getState = function() {
        this.state.date_calendar = this.moment.format(this.config.format);

        return this.state;
    }

    TavoCalendar.prototype.sync = function(obj) {
        let state;
        let config;

        if (obj instanceof TavoCalendar) {
            state = JSON.parse(JSON.stringify(obj.getState()));
            config = JSON.parse(JSON.stringify(obj.getConfig()));
        } else {
            state = JSON.parse(JSON.stringify(obj.state));
            config = JSON.parse(JSON.stringify(obj.config));
        }

        this.moment = moment(state.date_calendar, config.format)
        this.moment.locale(config.locale);

        this.locale_data = this.moment.localeData();

        this.state = state;
        this.config = config;

        this.destroy();
        this.mount();
        this.bindEvents();
    }

    TavoCalendar.prototype.setState = function(state) {
        this.state = state;

        this.destroy();
        this.mount();
        this.bindEvents();
    }

    TavoCalendar.prototype.nextMonth = function(e) {
        this.moment.add(1, 'month');

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.prevMonth = function(e) {
        this.moment.subtract(1, 'month');

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.setSelected = function(date) {
        if (this.state.selected) {
            this.state.selected[this.state.selected.length - 1] = date;
        } else {
            this.state.selected.push(date);
        }

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.addSelected = function(date) {
        if (this.state.selected.length == 1) {
            this.config.multi_select = true;
        }

        this.state.selected.push(date);

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.clearSelected = function() {
        this.state.selected = []

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.clearRange = function() {
        this.reset();
    }

    TavoCalendar.prototype.clear = function() {
        this.state.selected = []

        this.state.date_start = null;
        this.state.date_end = null;

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.reset = function() {
        this.state.date_start = null;
        this.state.date_end = null;

        if (!this.config.frozen) {
            this.state.lock = false;
        }

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.removeLock = function() {
        this.state.lock = false;
        this.elements.calendar_code.classList.remove(CLASS_CALENDAR_CODE_LOCK);
    }

    TavoCalendar.prototype.bindEvents = function() {
        var that = this;

        this.elements.calendar_nav_next.addEventListener('click', function(e) {
            that.nextMonth(e);
            that.elements.wrapper.dispatchEvent(new Event('calendar-change'))
        });

        this.elements.calendar_nav_prev.addEventListener('click', function(e) {
            that.prevMonth(e);
            that.elements.wrapper.dispatchEvent(new Event('calendar-change'))
        });

        this.elements.calendar_reset.addEventListener('click', function(e) {
            that.reset();
            that.elements.wrapper.dispatchEvent(new Event('calendar-reset'))
        });

        this.elements.calendar_code.addEventListener('click', function(ev) {
            ev.preventDefault();

            if (that.state.lock) {
                ev.stopImmediatePropagation();

                that.removeLock();
            }
        }, true);
    }

    TavoCalendar.prototype.lock = function() {
        this.state.lock = true;

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.unlock = function() {
        this.state.lock = false;

        this.destroy();
        this.mount()
        this.bindEvents();
    }

    TavoCalendar.prototype.destroy = function() {
        this.elements.wrapper.innerHTML = '';
    }

    return TavoCalendar;
});

/**
 * jQuery adapter for TavoCalendar
 */
if (window.jQuery && window.TavoCalendar) {
    (function($, TavoCalendar) {
        'use strict';

        $.fn.tavoCalendar = function(options) {
            return new TavoCalendar(this[0], options);
        };
    })(window.jQuery, window.TavoCalendar);
}

//initialize calendar

const myCalendar = new TavoCalendar('#my-calendar', {
    range_select: false,
    format: "MM-DD-YYYY",
    multi_select: false,
    past_select: false,
    date_start: new Date(Date.now())
})

function getDateDummy() {
    var a = myCalendar.getSelected();
    a = new Date(a);

    currDate = (a.toString().substring(0, 15))

}