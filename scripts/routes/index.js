const Application = require("sf-core/application");
const Image = require("sf-core/ui/image");
const OS = require('sf-core/device/system').OS;
const buildExtender = require("sf-extension-utils/lib/router/buildExtender");
const {
    NativeRouter: Router,
    NativeStackRouter: StackRouter,
    Route
} = require("@smartface/router");
require("sf-extension-utils/lib/router/goBack"); // Implements onBackButtonPressed
const backClose = require("sf-extension-utils/lib/router/back-close");
backClose.setDefaultBackStyle({ image: Image.createFromFile("images://back_arrow.png"), hideTitle: true });
backClose.dissmissBuilder = (match, routeData, router, pageInstance, pageProps, route) => {
    return { text: global.lang.cancel, position: "right" };
};

const mainRouter = StackRouter.of({
    path: "/pages",
    routes: [
        Route.of({
            path: "/pages/accountlist",
            build: buildExtender({ getPageClass: () => require("pages/pgAccounts"), headerBarStyle: { visible: false } })
        }),
        Route.of({
            path: "/pages/account",
            build: buildExtender({ getPageClass: () => require("pages/pgAccount"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/deviceApplicationRestrictions",
            build: buildExtender({ getPageClass: () => require("pages/pgDeviceApplicationRestrictions"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/staticContent",
            build: buildExtender({ getPageClass: () => require("pages/pgStaticContent"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/feedback",
            build: buildExtender({ getPageClass: () => require("pages/pgFeedback"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/device",
            build: buildExtender({ getPageClass: () => require("pages/pgDevice"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/deviceTimeLimit",
            build: buildExtender({ getPageClass: () => require("pages/pgTimeLimitConfiguration"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/whiteBlackList",
            build: buildExtender({ getPageClass: () => require("pages/pgWhiteBlackList"), headerBarStyle: { visible: true } })
        }),
        Route.of({
            path: "/pages/deviceAppLimit",
            build: buildExtender({ getPageClass: () => require("pages/pgDeviceApplicationRestrictions"), headerBarStyle: { visible: true } })
        }),
        StackRouter.of({
            path: "/pages/editAccountName",
            modal: true,
            routes: [
                Route.of({
                    path: "/pages/editAccountName/editAccountName",
                    build: buildExtender({ getPageClass: () => require("pages/pgAccountEdit"), headerBarStyle: { visible: true } })
                })
            ]
        }),
        StackRouter.of({
            path: "/pages/editDeviceName",
            modal: true,
            routes: [
                Route.of({
                    path: "/pages/editDeviceName/editDeviceName",
                    build: buildExtender({ getPageClass: () => require("pages/pgAccountEdit"), headerBarStyle: { visible: true } })
                })
            ]
        })
    ]
});

const onboardingRouter = StackRouter.of({
    path: "/onboarding",
    routes: [
        Route.of({
            path: "/onboarding/login",
            build: buildExtender({ getPageClass: () => require("pages/pgLogin"), headerBarStyle: { visible: false } })
        })
    ]
});

const router = Router.of({
    path: "/",
    isRoot: true,
    routes: [
        onboardingRouter,
        mainRouter
    ]
});

router.listen(() => {
    Application.hideKeyboard();
});

module.exports = router;
