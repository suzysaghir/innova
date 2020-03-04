const extend = require('js-base/core/extend');
const LviTimeLimitDesign = require('library/LviTimeLimit');
const System = require("sf-core/device/system");
const TimePicker = require("sf-core/ui/timepicker");
const pushClassNames = require("@smartface/contx/lib/styling/action/pushClassNames");
const removeClassName = require("@smartface/contx/lib/styling/action/removeClassName");
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const touch = require("sf-extension-utils/lib/touch");

const StyleClasses = {
    TimeLabel: ".lviTimeLimit-lblTime.active",
    DayLabel: ".lviTimeLimit-lblDay.active",
    TimeLayout: ".lviTimeLimit-flTime.active"
};

const LviTimeLimit = extend(LviTimeLimitDesign)(
    function(_super, props = {}, pageName) {
        _super(this, props);
        this.pageName = pageName;
        this.switchToggle = switchToggle.bind(this);
        this.toggleSeparator = toggleSeparator.bind(this);

        let _startTime = { hour: NaN, minute: NaN };
        let _endTime = { hour: NaN, minute: NaN };
        const startTimePicker = new TimePicker();
        const endTimePicker = new TimePicker();
        this.swTimeLimit.onToggleChanged = this.switchToggle;
        initTimeClicks.call(this, startTimePicker, endTimePicker);
        Object.defineProperties(this, {
            dayText: {
                get: () => this.lblDay.text || "",
                set: (value) => this.lblDay.text = value
            },
            toggle: {
                get: () => this.swTimeLimit.toggle,
                set: (value) => {
                    this.swTimeLimit.toggle = value;
                    this.switchToggle(value);
                }
            },
            startTime: {
                get: () => _startTime,
                set: (time) => {
                    const newTime = convertTimeToObject(time);
                    startTimePicker.setTime(newTime);
                    _startTime = convertTimeToString(newTime);
                    this.lblStartTime.text = convertTimeToString(newTime);
                }
            },
            endTime: {
                get: () => _endTime,
                set: (time) => {
                    const newTime = convertTimeToObject(time);
                    endTimePicker.setTime(newTime);
                    _endTime = convertTimeToString(newTime);
                    this.lblEndTime.text = convertTimeToString(newTime);
                }
            },
            onToggleChanged: {
                get: () => this.__onToggleChanged,
                set: (value) => {
                    this.flSwitch.onTouchEnded = (isInside) => {
                        if (isInside) {
                            value();
                            let newState = !this.swTimeLimit.toggle;
                            this.swTimeLimit.toggle = newState;
                            this.__onToggleChanged = value;
                        }
                    };
                }
            }
        });
    }
);

function convertTimeToObject(time = {}) {
    const splitTime = typeof time === "string" && time.split(":");
    return {
        hour: Number(splitTime[0]) || time.hour || 0,
        minute: Number(splitTime[1]) || time.minute || 0
    };
}

function convertTimeToString(time = {}) {
    return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}`;
}

function toggleSeparator(visible) {
    const component = this;
    const { flSeparator } = component;
    flSeparator.dispatch({
        type: "updateUserStyle",
        userStyle: {
            visible
        }
    });
}

function initTimeClicks(startTimePicker, endTimePicker) {
    const component = this;
    const { flStartTime, flEndTime } = component;
    if (System.OS === "Android") {
        startTimePicker.android.is24HourFormat = true;
        endTimePicker.android.is24HourFormat = true;
    }
    touch.addPressEvent(flStartTime, () => startTimePicker.show());
    touch.addPressEvent(flEndTime, () => endTimePicker.show());
    endTimePicker.onTimeSelected = (time) => component.endTime = time;
    startTimePicker.onTimeSelected = (time) => component.startTime = time;
}

function switchToggle(status) {
    const component = this;
    const { flStartTime, lblStartTime, flEndTime, lblEndTime, lblDay } = component;
    const actionToDispatch = status ? pushClassNames : removeClassName;
    flStartTime.dispatch(actionToDispatch(StyleClasses.TimeLayout));
    flEndTime.dispatch(actionToDispatch(StyleClasses.TimeLayout));
    lblStartTime.dispatch(actionToDispatch(StyleClasses.TimeLabel));
    lblEndTime.dispatch(actionToDispatch(StyleClasses.TimeLabel));
    lblDay.dispatch(actionToDispatch(StyleClasses.DayLabel));

}

module.exports = LviTimeLimit;

LviTimeLimit.getHeight = () => getCombinedStyle(".lviTimeLimit").height || 0;
