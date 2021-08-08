class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play()
  {
    //write code here to hide question elements
    question.hide();

    background("blue");
    textSize(40);
    text("Result Of Quiz",120,70)
    Contestant.getPlayerInfo();

    if(allContestants!==null)
    {
      fill("yellow");
      textSize(20);
      text("Contestants who answered correctly are HIGHLIGHTED in black colour",120,220);

      var display_position = 260;
      for(var plr in allContestants)
      {
        var correctAns="2";
        if(correctAns===allContestants[plr].answer)
        fill("black");
        else
        fill("red");

      display_position+=30;
      textSize(40);
      text(allContestants[plr].name+": "+allContestants[plr].answer,120,display_position)
    }
  }
  }
}
