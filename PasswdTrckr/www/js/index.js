/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*     var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    }
};

app.initialize();


/* -------------------------------Angular Js Code----------------------------------------- */

$(document).ready(function(){
    $(".Digits").click(function(){
        var $el = $(this),
            x = 100,
            originalColor = $el.css("background");

        $el.css("background", "#DCDCDC");
        setTimeout(function(){
          $el.css("background", originalColor);
        }, x);
    });
});
/* ----------------------------------End Code----------------------------------------- */


/* -------------------------------Angular Js Code----------------------------------------- */

angular.module('PasswordApp', ['ngTouch']).controller('MainController', function ($scope) {

    $scope.ShowList = function() {
        //For Test
       /* var Str = '[{"Name": "Gmail","UserName": "Manju@in","Pwd": "Hello"},{"Name": "Gmail","UserName": "Manju@in","Pwd": "Hello"}]';
        localStorage.setItem("MyPasswords", Str);
        */
        //For Getting the Data..
        //localStorage.clear();
        $scope.RecordList = JSON.parse ( localStorage.getItem("MyPasswords") );
        $("#ShowList").show();
        $("#ShowMenu").hide();
        $("#ShowDetails").hide();
        $("#AddRecord").hide();
        $("#EditRecord").hide();


    };


    $scope.AddRecord = function(Record){
        /*
        var StringForRecord = '{"Name":'+Record.Name+',"UserName":'+Record.UserName+',"Pwd":'+Record.Pwd+'}';
        var OldEntries = localStorage.getItem("MyPasswords");
        var NewSet = OldEntries + StringForRecord;
        localStorage.setItem("MyPasswords", NewSet);
        $scope.RecordList = JSON.parse ( localStorage.getItem("MyPasswords") );
        */
        //var Temp = {"Name":"New","UserName":"njkdf","Pwd":"vjdn"};
        

        if (localStorage.getItem("MyPasswords") === null) {
            var Str =  "["+JSON.stringify(Record)+"]";
            //var Str = '[{"Name":'+Record.Name+',"UserName":'+Record.UserName+',"Pwd":'+Record.Pwd+'}]';
            //var temo =  "["+( localStorage.getItem("MyPasswords") )+"]";
            //$scope.RecordList = "["+temo+"]";
            localStorage.setItem("MyPasswords", Str);
            $scope.RecordList = (JSON.parse ( localStorage.getItem("MyPasswords") ));
        }
        else{
            var old =JSON.parse ( localStorage.getItem("MyPasswords") );
            old.push(Record);
            localStorage.setItem("MyPasswords", JSON.stringify(old));
            $scope.RecordList = JSON.parse ( localStorage.getItem("MyPasswords") );
        }
        $scope.ShowList();

    };

    $scope.ShowDetails = function(Name){
        for (i in $scope.RecordList) {
            var Temp = $scope.RecordList[i];
            if(Name == Temp.Name){
                $scope.SelectedName = Temp.Name;
                $scope.SelectedUserName = Temp.UserName;
                $scope.SelectedPwd = Temp.Pwd;
                
                $("#ShowList").hide();
                $("#ShowMenu").hide();
                $("#ShowDetails").show();
                $("#AddRecord").hide();
                $("#EditRecord").hide();
            }
        }
    };

    $scope.GoHome = function(){
        $("#ShowList").hide();
        $("#ShowMenu").show();
        $("#ShowDetails").hide();
        $("#AddRecord").hide();
        $("#EditRecord").hide();
    };

    $scope.ShowForm = function(){
        $("#ShowList").hide();
        $("#ShowMenu").hide();
        $("#ShowDetails").hide();
        $("#AddRecord").show();  
        $("#EditRecord").hide();
    };

    $scope.DeleteRecord = function(){

    };

    $scope.DeleteAll = function(){
        localStorage.clear();
    };

    $scope.EditDetails = function(Name){
            for (i in $scope.RecordList) {
            var Temp = $scope.RecordList[i];
            if(Name == Temp.Name){
                $scope.EditRecords = Temp;

                $("#ShowList").hide();
                $("#ShowMenu").hide();
                $("#ShowDetails").hide ();
                $("#AddRecord").hide();
                $("#EditRecord").show();
            }
        }
    };

    $scope.EditRecord = function(EditRecords) {
        for (i in $scope.RecordList) {
            var Temp = $scope.RecordList[i];
            if(EditRecords.Name == Temp.Name){
                $scope.RecordList.splice(i,1);
                console.log($scope.RecordList);
                $scope.RecordList.push(EditRecords);
                localStorage.setItem("MyPasswords", JSON.stringify($scope.RecordList));
                $scope.RecordList = JSON.parse ( localStorage.getItem("MyPasswords") );
                $scope.ShowList();
            }
        }
    };

    $scope.DeleteDetails = function(Name){
         for (i in $scope.RecordList) {
            var Temp = $scope.RecordList[i];
            if(Name == Temp.Name){
                $scope.RecordList.splice(i,1);
                localStorage.setItem("MyPasswords", JSON.stringify($scope.RecordList));
                $scope.RecordList = JSON.parse ( localStorage.getItem("MyPasswords") );
                $scope.ShowList();
            }
        }
    };



    /*For Login*/
    
    $scope.PIN = '';
    $scope.Login = function(Number) {
        $(".Digits").removeClass("Error");

        $scope.PIN += Number;
        if($scope.PIN.length == 4){
            if($scope.PIN == "1234")
            {
                $("#ShowMenu").show();
                $("#Login").hide();   
            }
            else
            {
                $(".Digits").addClass("Error");
            }
            $scope.PIN = '';
        }
    }

    /*End Login*/
});
