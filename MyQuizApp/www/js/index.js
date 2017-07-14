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
        var url = "https://opentdb.com/api.php?amount=10&type=multiple"
        $.getJSON(url,function(data){
            console.log("Quiz retrieved");
            console.log(data);

            var correctOption = Math.floor(Math.random()*4);
            
            var showOptions= function(question) {
                for (i = 0; i < 4; i++){
                    if (correctOption == i){
                        $("#option" + i).html(question.correct_answer);

                    } else {
                        $("#option"+ i).html(question.incorrect_answers.pop());

                }
            }

            var showQuestion = function(question) {
                 $("#answer").html(question.question);     
            };

             var points = 0
             var currentQuestion = 0;

             // checkAnswer.click = checks if correct, adds 1 to score, hides checkanswer button, shows nextquestion button
             $("#answeroptions").click(function(){
                $("#checkanswer").show();
             });

             $("#checkanswer").click(function() {
                if($('input[name=option]:checked', '#answeroptions').val() == correctOption){
                    console.log("Correct");
                    points++

                } else{
                    console.log("Wrong");

                }
                $("#checkanswer").hide();
                $("#nextquestion").show();


             })

             // nextQuestion.click = adds 1 to currentquestion, shows next question and answers, hides nextquestion button, shows checkanswer button

             $("#nextquestion").click(function(){
                currentQuestion++;

                $("#checkanswer").show();
                $("#nextquestion").hide();
             

                if (currentQuestion >= 10){
                    console.log("Your score is "+ points +"/10");
                    
                       /* if($("input[name=option]:checked".val() == question.correct_answer)){
                               $("#checkanswer").click(function(){
                    console.log("Correct")
                });
                            points == point + 1
                        }else {
                            console.log("Incorrect")
                             $("#checkanswer").click(function(){
                    $("#answer").html(question.correct_answer);
                });
                             console.log("Your score is " + points + "/10");z

                        }*/

                      //  app.refresh();

                    } else {

                        showQuestion(data.results[currentQuestion]);
                        showOptions(data.results[currentQuestion]);
                        
                    }

                });
            }                
                
        });
    },

    refresh: function(){
       // $("#quiz").html("");
        this.getQuiz();
    }


};

app.initialize();