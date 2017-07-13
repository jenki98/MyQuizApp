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
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.getQuiz();


},
   getQuiz: function(){
        console.log("Trying to get quiz");
        var url = "https://opentdb.com/api.php?amount=10"
        $.getJSON(url,function(data){
            console.log("Quiz retrieved");
            console.log(data);
            /*var correctOption = Math.floor(Math.random()*4);
            if (correctOption == 0){
*/

    

            var showQuestion = function(i) {
               $("#answer").html(data.results[i].question);
                $("#showanswer").click(function(){
                    $("#answer").html(data.results[i].correct_answer);
                });
            };
            
                   var currentQuestion = 0;
                 $("#nextquestion").click(function(){
                currentQuestion++;
                showQuestion(currentQuestion);
            });
         
        
                
        });
    },

    refresh: function(){
       // $("#quiz").html("");
        this.getQuiz();
    }


};

app.initialize();