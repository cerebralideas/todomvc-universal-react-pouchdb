"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require('react');
var react_props_decorators_1 = require('react-props-decorators');
var Baz = (function (_super) {
    __extends(Baz, _super);
    function Baz() {
        _super.apply(this, arguments);
    }
    Baz = __decorate([
        react_props_decorators_1.propTypes({
            foo: React.PropTypes.string,
            bar: React.PropTypes.number
        }),
        react_props_decorators_1.defaultProps({
            foo: "defaultString",
            bar: 100
        }), 
        __metadata('design:paramtypes', [])
    ], Baz);
    return Baz;
}(React.Component));
//# sourceMappingURL=react-props-decorators-tests.js.map