/**
 * Title        :   Main Controller for Client Side Application
 * Author       :   Julien Bongars
 * Date         :   05/09/2017
 * Comments     :   Main Controller for Assignment1 (StackUp)
 */

(function () {
    
    "use strict";

    angular.module("RegApp").controller("RegistrationCtrl", RegistrationCtrl);

    RegistrationCtrl.$inject = ["$http", "$window", "$scope"];

    function RegistrationCtrl($http, $window, $scope) {
        var self = this; // vm

        $scope.user = {
            email: "",
            password: "",
            confirmPassword: "",
            fullname: "",
            gender: "",
            dateofbirth: "",
            address: "",
            country: "",
            contactnumber: ""
        };

        self.displayUser = {
            email: "",
            password: ""
        };

        self.hideform = false;
        self.showty = false;
        self.showdr = false;

        self.today = new Date();
        self.minAge = new Date(self.today.getFullYear() - 18, self.today.getMonth(), self.today.getDate());

        //https://gist.github.com/darryl-snow/3820279
        self.countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];

        self.registerUser = function () {
            console.log(JSON.stringify($scope.user));

            $http.post("/register", $scope.user)
                .then(function (result) {
                    console.log(result);

                    //would of prefered $routeprovider but perhaps too complicated for this
                    self.hideform = true;
                    self.showty = true;

                    //document.getElementById('myModal').setAttribute('class', 'in');

                }).catch(function (e) {
                    console.log(e);
                    if(e.data.duplicateRecord == 0){
                        self.showdr = true;
                        self.showty = false;
                    }
                });
        };
    }

})();