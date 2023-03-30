// import angular, { IScope, IModule } from 'angular';

interface IMainControllerScope extends ng.IScope {

}

class MainController {
    constructor(private $scope: IMainControllerScope) {
    }
}

interface IHomeControllerScope extends ng.IScope {

}

class HomeController {
    constructor(private $scope: IHomeControllerScope) {
    }
}

interface IDateHelperControllerScope extends ng.IScope {

}

class DateHelperController {
    constructor(private $scope: IDateHelperControllerScope) {
    }
}

interface IRegexBuilderControllerScope extends ng.IScope {

}

class RegexBuilderController {
    constructor(private $scope: IRegexBuilderControllerScope) {
    }
}

interface IRegexMatchControllerScope extends ng.IScope {

}

class RegexMatchController {
    constructor(private $scope: IRegexMatchControllerScope) {
    }
}

interface IRegexTestControllerScope extends ng.IScope {

}

class RegexTestController {
    constructor(private $scope: IRegexTestControllerScope) {
    }
}

interface IUriHomeControllerScope extends ng.IScope {

}

class UriHomeController {
    constructor(private $scope: IUriHomeControllerScope) {
    }
}

interface IUriBuilderControllerScope extends ng.IScope {

}

class UriBuilderController {
    constructor(private $scope: IUriBuilderControllerScope) {
    }
}

class UriUserInfo {
    private _userName: string;
    public get userName() : string {
        return this._userName;
    }
    public set userName(v : string) {
        this._userName = v;
    }

    private _password?: string;
    public get password() : string | undefined {
        return this._password;
    }
    public set password(v : string | undefined) {
        this._password = (typeof v === 'string' && v.length > 0) ? v : undefined;
    }

    constructor(userName: string) {
        this._userName = userName;
    }
}

class UriAuthority {
    private _scheme?: string;
    public get scheme() : string | undefined {
        return this._scheme;
    }
    public set scheme(v : string | undefined) {
        this._scheme = (typeof v === 'string' && v.length > 0) ? v : undefined;
    }
    
    private _userInfo?: UriUserInfo;
    public get userInfo() : UriUserInfo | undefined {
        return this._userInfo;
    }
    public set userInfo(v : UriUserInfo | undefined) {
        this._userInfo = v;
    }
    
    private _hostName: string;
    public get hostName() : string {
        return this._hostName;
    }
    public set hostName(v : string) {
        this._hostName = v;
    }
    
    private _port?: number;
    public get port() : number | undefined {
        return this._port;
    }
    public set port(v : number | undefined) {
        this._port = (typeof v === 'number' && !isNaN(v) && v > 0 && v < 65536) ? v : undefined;
    }

    constructor(hostName: string) {
        this._hostName = hostName;
    }

    toString(): string {
        var uriString;
        if (typeof this._scheme !== 'undefined') {
            if (typeof this._userInfo === 'undefined')
                uriString = this._scheme + '://' + this._hostName;
            else if (typeof this._userInfo.password === 'undefined')
                uriString = this._scheme + '://' + this._userInfo.userName + '@' + this._hostName;
            else
                uriString = this._scheme + '://' + this._userInfo.userName + ':' + this._userInfo.password + '@' + this._hostName;
        } else if (typeof this._userInfo === 'undefined')
            uriString = this._hostName;
        else if (typeof this._userInfo.password === 'undefined')
            uriString = this._userInfo.userName + '@' + this._hostName;
        else
            uriString = this._userInfo.userName + ':' + this._userInfo.password + '@' + this._hostName;
        try {
            return new URL(uriString).href;
        } catch {
            return uriString;
        }
    }

    toURL(): URL | undefined {
        var result: URL;
        try {
            if (typeof this._scheme !== 'undefined') {
                if (typeof this._userInfo === 'undefined')
                    result = new URL(this._scheme + '://' + this._hostName)
                else if (typeof this._userInfo.password === 'undefined')
                    result = new URL(this._scheme + '://' + this._userInfo.userName + '@' + this._hostName);
                else
                    result = new URL(this._scheme + '://' + this._userInfo.userName + ':' + this._userInfo.password + '@' + this._hostName);
            } else if (typeof this._userInfo === 'undefined')
                result = new URL(this._hostName)
            else if (typeof this._userInfo.password === 'undefined')
                result = new URL(this._userInfo.userName + '@' + this._hostName);
            else
                result = new URL(this._userInfo.userName + ':' + this._userInfo.password + '@' + this._hostName);
        } catch {
            return;
        }
        if (typeof this._port === 'number')
            result.port = this._port.toString();
        return result;
    }
}

class UriQueryItem {
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(v : string) {
        this._key = v;
    }
    
    private _value: string | null;
    public get value() : string | null {
        return this._value;
    }
    public set value(v : string | null) {
        this._value = v;
    }
    constructor(key: string, value: string | null) {
        this._key = key;
        this._value = value;
    }

    toString(): string {
        if (typeof this._value === 'string')
        {
            if (this._key.length > 0)
                return encodeURIComponent(this._key) + ((this._value.length > 0) ? "=" + encodeURIComponent(this._value) : "=");
            return (this._value.length > 0) ? "=" + encodeURIComponent(this._value) : "=";
        }
        return (this._key.length > 0) ? encodeURIComponent(this._key) : "";
    }
}

class UriBuilder {
    private _authority?: UriAuthority;
    public get authority() : UriAuthority | undefined {
        return this._authority;
    }
    public set authority(v : UriAuthority | undefined) {
        this._authority = v;
    }
    
    private _pathSegments: string[];
    public get pathSegments() : string[] {
        return this._pathSegments;
    }
    public set pathSegments(v : string[]) {
        this._pathSegments = v;
    }

    private _query: UriQueryItem[];
    public get query() : UriQueryItem[] {
        return this._query;
    }
    public set query(v : UriQueryItem[]) {
        this._query = v;
    }

    private _fragment?: string;
    public get fragment(): string | undefined {
        return this._fragment;
    }
    public set fragment(v: string | undefined ) {
        this._fragment = (typeof v === 'string' && v.length > 0) ? v : undefined;
    }

    constructor(uriString: string)
    {
        var queryString: string | undefined;
        try {
            var url = new URL(uriString);
            this._authority = new UriAuthority(url.hostname);
            var port = parseInt(url.port);
            if (!isNaN(port) && port > 0 && port < 65536)
                this._authority.port = port;
            if (typeof url.password === 'string' && url.password.length > 0)
                (this._authority.userInfo = new UriUserInfo(url.username)).password = url.password;
            else if (typeof url.username === 'string' && url.username.length > 0)
                this._authority.userInfo = new UriUserInfo(url.username);
            if (typeof url.search == 'string' && url.search.length > 0) {
                if (url.search.startsWith('?')) {
                    if (url.search.length > 1)
                        queryString = url.search.substring(1);
                }
                else
                    queryString = url.search
            }
            if (typeof url.hash == 'string' && url.hash.length > 0) {
                if (url.hash.startsWith('#')) {
                    if (url.hash.length > 1)
                        this._fragment = decodeURIComponent(url.hash.substring(1));
                }
                else
                    this._fragment = decodeURIComponent(url.hash);
            }
            this._pathSegments = (typeof url.pathname === 'string') ? url.pathname.split('/').map(function(s: string): string { return (s.length > 0) ? decodeURIComponent(s) : ""; }) : [""];
        } catch {
            var fragment: string;
            var i = uriString.indexOf('#');
            if (i == 0) {
                fragment = (uriString.length > 1) ? uriString.substring(1) : "";
                uriString = "";
            } else if (i > 0) {
                fragment = (i < uriString.length - 1) ? uriString.substring(i) : "";
                uriString = uriString.substring(0, i);
            } else
                fragment = "";
            if ((i = uriString.indexOf('?')) == 0) {
                queryString = (uriString.length > 1) ? uriString.substring(1) : "";
                uriString = "";
            } else if (i > 0) {
                queryString = (i < uriString.length - 1) ? uriString.substring(i) : "";
                uriString = uriString.substring(0, i);
            } else
                queryString = "";
            if (uriString.length > 0) {
                var url = new URL("http://localhost");
                url.pathname = uriString;
                if (uriString.startsWith('/') || uriString.startsWith('\\'))
                    uriString = url.pathname;
                else
                    uriString = (url.pathname.length > 1) ? url.pathname.substring(1) : "";
                if (fragment.length > 0) {
                    url.hash = fragment;
                    if (url.hash.startsWith('#')) {
                        if (url.hash.length > 1)
                            this._fragment = decodeURIComponent(url.hash.substring(1));
                    }
                    else
                        this._fragment = decodeURIComponent(url.hash);
                }
                this._pathSegments = uriString.split('/').map(function(s: string): string { return (s.length > 0) ? decodeURIComponent(s) : ""; });
            } else {
                this._pathSegments = [];
                if (fragment.length > 0) {
                    var url = new URL("http://localhost");
                    url.hash = fragment;
                    if (url.hash.startsWith('#')) {
                        if (url.hash.length > 1)
                            this._fragment = decodeURIComponent(url.hash.substring(1));
                    }
                    else
                        this._fragment = decodeURIComponent(url.hash);
                }
            }
        }
        if (typeof queryString === 'string' && queryString.length > 0) {
            this._query = queryString.split('&').map(function(kvp: string): UriQueryItem {
                var i = kvp.indexOf('=');
                if (i < 0)
                    return new UriQueryItem(decodeURIComponent(kvp), null);
                if (i == 0)
                    return new UriQueryItem("", (kvp.length > 1) ? decodeURIComponent(kvp.substring(i + 1)) : "");
                return new UriQueryItem(decodeURIComponent(kvp.substring(0, i)), (i < kvp.length - 1) ? decodeURIComponent(kvp.substring(i + 1)) : "");
            });
        } else
            this._query = [];
    }

    toString(): string {
        var pathname = this._pathSegments.map(function(s: string): string { return (s.length > 0) ? encodeURIComponent(s) : ""; }).join("/");
        if (typeof this._authority !== 'undefined') {
            var url: URL | undefined = this._authority.toURL();
            if (typeof url !== 'undefined') {
                if (this._pathSegments.length > 0)
                    url.pathname = this._pathSegments.map(function(s: string): string { return (s.length > 0) ? encodeURIComponent(s) : ""; }).join("/");
                if (this._query.length > 0)
                    url.search = "?" + this._query.map(function(q: UriQueryItem): string { return q.toString() }).join("=");
                if (typeof this._fragment === 'string')
                    url.hash = '#' + encodeURI(this._fragment);
                return url.href;
            }
            var s = this._authority.toString();
            if (s.length > 0)
            {
                if (pathname.length > 0)
                    pathname = s + (pathname.startsWith('/') ? pathname : '/' + pathname);
            }
        }
        if (this._query.length > 0)
            pathname += "?" + this._query.map(function(q: UriQueryItem): string { return q.toString() }).join("=");
        return (typeof this._fragment === 'string') ? pathname + '#' + encodeURI(this._fragment) : pathname;
    }
}

interface IUriParserControllerScope extends ng.IScope {
    inputString: string;
    uriString: string;
    hasAuthority: boolean;
    hostName: string;
    port: string;
    hasUserInfo: boolean;
    userName: string;
    password: string;
    pathSegments: string[];
    query: UriQueryItem[];
    fragment: string;
}

class UriParserController {
    private onInputChanged(newValue: string): void {
        var ub = new UriBuilder(newValue);
        this.$scope.uriString = ub.toString();
        var authority = ub.authority;
        if (typeof authority !== 'undefined') {
            this.$scope.hasAuthority = true;
            this.$scope.hostName = authority.hostName;
            this.$scope.port = (typeof authority.port === 'number') ? authority.port.toString() : "";
            var userInfo = authority.userInfo;
            if (typeof userInfo !== 'undefined')
            {
                this.$scope.hasUserInfo = true;
                this.$scope.userName = userInfo.userName;
                this.$scope.password = (typeof userInfo.password === 'string') ? userInfo.password : "";
            } else {
                this.$scope.hasUserInfo = false;
                this.$scope.userName = '';
                this.$scope.password = '';
            }
        } else {
            this.$scope.hasAuthority = false;
            this.$scope.hasUserInfo = false;
            this.$scope.hostName = '';
            this.$scope.port = '';
            this.$scope.userName = '';
            this.$scope.password = '';
        }
        this.$scope.pathSegments = ub.pathSegments;
        this.$scope.query = ub.query;
        this.$scope.fragment = (typeof ub.fragment === 'string') ? ub.fragment : "";
    }

    constructor(private $scope: IUriParserControllerScope) {
        if (typeof $scope.inputString != 'string')
            $scope.inputString = '';
        this.onInputChanged($scope.inputString);
        var controller: UriParserController = this;
        $scope.$watch('inputString', function (newValue: string, oldValue: string) { controller.onInputChanged(newValue); });
    }
}

var app: ng.IModule = angular.module('snHelper', ["ngRoute"]);

app.controller("MainController", MainController);

app.config([
    "$routeProvider",
    "$locationProvider",
    function ($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {
        $routeProvider
            // .when('/newSession/:deckId', {
            //     templateUrl: "newSession.htm",
            //     controller: NewSessionController,
            //     controllerAs: "controller"
            // })
            .when('/home', {
                templateUrl: "templates/home.htm",
                controller: HomeController,
                controllerAs: "controller"
            })
            .when('/date', {
                templateUrl: "templates/date.htm",
                controller: DateHelperController,
                controllerAs: "controller"
            })
            .when('/regex', {
                templateUrl: "templates/regex/build.htm",
                controller: RegexBuilderController,
                controllerAs: "controller"
            })
            .when('/regex/match', {
                templateUrl: "templates/regex/match.htm",
                controller: RegexMatchController,
                controllerAs: "controller"
            })
            .when('/regex/test', {
                templateUrl: "templates/regex/test.htm",
                controller: RegexTestController,
                controllerAs: "controller"
            })
            .when('/uri', {
                templateUrl: "templates/uri/home.htm",
                controller: UriHomeController,
                controllerAs: "controller"
            })
            .when('/uri/build', {
                templateUrl: "templates/uri/build.htm",
                controller: UriBuilderController,
                controllerAs: "controller"
            })
            .when('/uri/parse', {
                templateUrl: "templates/uri/parse.htm",
                controller: UriParserController,
                controllerAs: "controller"
            })
            .when('/', {
                redirectTo: "/home"
            });
        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(true);
    },
]);