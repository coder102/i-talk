var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'src/views/main.html'
        })
        .when('/view', {
            templateUrl: 'src/views/view.html',
            controller: 'viewCtrl'
        })
        .when('/list', {
            templateUrl: 'src/views/list.html'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

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

app.controller('main', ['$scope', function ($scope) {



}]);

app.controller('viewCtrl', ['$scope', function ($scope) {

}]);

app.controller('list', ['$scope', function ($scope) {

    $scope.defaultImageSrc = 'public/img/experts/default.jpg';
    $scope.list = [
        {
            name: 'IT',
            experts: [
                {
                    name: 'Maksims',
                    career: 'Web programmētājs',
                    lang: 'LV/RU/EN',
                    image: 'public/img/experts/maksims.jpg',
                    desc: 'Izveidosim plānu kā no nulles vari iemācīties programmēt Web aplikācijas, mājaslapas un 3-6 mēnešu laikā iegūt pirmo darbu IT vai sākt savu projektu. :)',
                    desc2: 'Pirmo darbu ieguvu 18 gados Frontend izstrādātāja lomā. Tāpat strādāju par jaunāko programmētāju Dynatech Latvia - no visiem 300 darbiniekiem 2.jaunākais pēc manis bija 21 gadus vecs.',
                    stars: 4.5,
                    ratings: 1
                },
                {
                    name: 'Mihails',
                    career: 'Web dizainers',
                    image: 'public/img/experts/michael.jpg',
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
                    image: 'public/img/experts/vadims.jpg',
                    desc: 'Varam parunāt par to, kas tev jādara, lai paliktu veiksmīgam jebkurā sfērā.',
                    desc2: 'Esmu SIA "Credo" direktors jau 2.gadu.',
                    stars: 0,
                    ratings: 0
                }
            ]
        }
    ];

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
