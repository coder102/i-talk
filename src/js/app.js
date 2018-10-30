var app = angular.module('app', ['ngRoute', 'pascalprecht.translate']);

app.config([
    '$routeProvider',
    '$locationProvider',
    '$translateProvider',
    function ($routeProvider, $locationProvider, $translateProvider) {

    $routeProvider
        .when('/view/:categoryId/:expertId', {
            templateUrl: '/src/views/show.html',
            controller: 'showCtrl'
        })
        .when('/', {
            templateUrl: '/src/views/main.html'
        })
        .when('/list', {
            templateUrl: '/src/views/list.html'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $translateProvider
        .useStaticFilesLoader({
            prefix: 'translations',
            suffix: '.json'
        })
        .preferredLanguage('en')
        useMissingTranslationHandlerLog();
}]);

// =========================================
// ---------------- Factories --------------
// =========================================
app.factory('expertsFactory', function() {
    return [
        {
            name: 'IT',
            experts: [
                {
                    name: 'Maksims',
                    career: 'Web programmētājs',
                    lang: 'LV/RU/EN',
                    image: '/public/img/experts/maksims.jpg',
                    desc: 'Izveidosim plānu kā no nulles vari iemācīties programmēt Web aplikācijas, mājaslapas un 3-6 mēnešu laikā iegūt pirmo darbu IT vai sākt savu projektu. :)',
                    desc2: 'Pirmo darbu ieguvu 18 gados Frontend izstrādātāja lomā. Tāpat strādāju par jaunāko programmētāju Dynatech Latvia - no visiem 300 darbiniekiem 2.jaunākais pēc manis bija 21 gadus vecs.',
                    stars: 4.5,
                    ratings: 1
                },
                {
                    name: 'Mihails',
                    career: 'Web dizainers',
                    image: '/public/img/experts/michael.jpg',
                    desc: 'Izstāstīšu par dizainera darbu, pienākumiem, varu pastāstīt, kur un ko vislabāk mācīties, lai ātri attīstītos šajā sfērā. Raksti ;)',
                    stars: 4,
                    ratings: 4
                }
            ]
        },
        {
            name: "Bizness un ekonomika",
            experts: [
                {
                    name: 'Vadims Karišovs',
                    career: 'SIA "Credo Autoprieks" direktors',
                    image: '/public/img/experts/vadims.jpg',
                    desc: 'Varam parunāt par to, kas tev jādara, lai paliktu veiksmīgam jebkurā sfērā.',
                    desc2: 'Esmu SIA "Credo" direktors jau 2.gadu.',
                    stars: 0,
                    ratings: 0
                }
            ]
        }
    ];
});

// =========================================
// ---------------- Filters ----------------
// =========================================

app.filter('loop', function () {
    return function (input) {
        var array = [];

        for(var i = 0; i < parseInt(input); i++) {
            array.push(i);
        }

        return array;
    };
})

// =========================================
// -------------- Controllers --------------
// =========================================

app.controller('main', ['$scope', 'expertsFactory', function ($scope, expertsFactory) {

    $scope.nav = [
        {
            name: 'Galvenā'
        }
    ]

}]);

app.controller('showCtrl', ['$scope', '$routeParams', 'expertsFactory', function ($scope, $routeParams, expertsFactory) {
    var categoryId = $routeParams.categoryId,
        expertId = $routeParams.expertId,
        list = expertsFactory,
        expert = list[categoryId].experts[expertId];

    $scope.expert = expert;

}]);

app.controller('list', ['$scope', 'expertsFactory', function ($scope, expertsFactory) {

    $scope.defaultImageSrc = '/public/img/experts/default.jpg';
    $scope.list = expertsFactory;

}]);

// =========================================
// ------------------ JS -------------------
// =========================================
var $header = $('.js-header'),
    isActiveHeader = false;

$(document).on('scroll', function (e) {
    var isTop = $(window).scrollTop() === 0;

    if(!isActiveHeader && !isTop) {
        $header.addClass('header--active');
        isActiveHeader = true;
    } else if (isTop) {
        $header.removeClass('header--active');
        isActiveHeader = false;
    }
});
