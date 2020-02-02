import React from 'react';
import "./styles.css";
import Square from "./components/Square";
import ControlPanel from "./components/ControlPanel";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares : Array(100).fill("smallSquareDark"),
      game: 0,
      startAction : false,
      direction : "dark-bright",
      bufferId : null,
      bufferIdConst: null,
      numberOfAction : 0
    }
    this.checkerGameIsChosen = this.checkerGameIsChosen.bind(this);
  }

  // Control /////////////////////
  gameSwitcher = event => {
    let chosenSquare = event.target.getAttribute('id');
    this.setState({
      game: chosenSquare
    })
  }
  checkerGameIsChosen = event => {
    if (this.state.game === "0") {

    } else if (this.state.game === "1"){
      this.starterGame(event);
    } else if (this.state.game === "2") {
      this.starterGame(event);
    } else if (this.state.game === "3") {
      this.starterGame(event);
    }
  }
  starterGame = event => {
    //event.preventDefault();
    let currentId = event.target.getAttribute('id');
    let currentStyle = event.target.getAttribute('class');
    let currentSquares = this.state.squares;
    if (currentStyle.localeCompare("smallSquareDark") === 0) {
      currentSquares[currentId] = "smallSquareBright";
    } else {
      currentSquares[currentId] = "smallSquareDark";
    }
    this.setState({
      squares: currentSquares,
      startAction: true,
      bufferId : currentId,
      bufferIdConst : currentId
    });

  }
  componentDidUpdate() {
    if (this.state.game === "1") {
      this.gameOne()
    } else if (this.state.game === "2") {
      this.gameTwo()
    } else if (this.state.game === "3") {
      this.gameThree()
    }
  }
  ////////////////////////////////

  // Games ///////////////////////
  gameOne() {
    let currentSquares = this.state.squares;
    let bDarkness = true;
    let bBrightness = true;
    let darkColor = "smallSquareDark";
    let brightColor = "smallSquareBright";

    if (this.state.startAction) {
      if (this.state.direction === "dark-bright") {

        //--check if all squares are already bright
        for (let i = 0; i<100; i++) {
          if (currentSquares[i] !== brightColor) {
            bBrightness = false;
          }
        }


        if (bBrightness) {
          this.setState({direction : "bright-dark"});
          this.setState({startAction : false});
          console.log("Game One done.");
        } else {
          setTimeout(() => {
            let randomNumber = Math.floor(Math.random() * 100);
            currentSquares[randomNumber] = "smallSquareBright";
            this.setState({
              squares: currentSquares
            });
          }, 1);
        }

      } else {

        //--check if all squares are already dark
        for (let i = 0; i<100; i++) {
          if (currentSquares[i] !== darkColor) {
            bDarkness = false;
          }
        }

        if (bDarkness) {
          this.setState({direction : "dark-bright"});
          this.setState({startAction : false});
          console.log("Game One done.");
        } else {
          setTimeout(() => {
            let randomNumber = Math.floor(Math.random() * 100);
            currentSquares[randomNumber] = "smallSquareDark";
            this.setState({
              squares: currentSquares
            });
          }, 1);
        }

      }
    }
  }
  gameTwo() {
    let currentSquares = this.state.squares;
    let bDarkness = true;
    let bBrightness = true;
    let darkColor = "smallSquareDark";
    let brightColor = "smallSquareBright";

    if (this.state.startAction) {
      if (this.state.direction === "dark-bright") {

        //--check if all squares are already bright
        for (let i = 0; i<100; i++) {
          if (currentSquares[i] !== brightColor) {
            bBrightness = false;
          }
        }

        if (bBrightness) {
          this.setState({direction : "bright-dark"});
          this.setState({startAction : false});
          this.setState({numberOfAction : 0});
          console.log("Game Two done.");
        } else {

          if (this.state.numberOfAction == 0) {

            // Go left
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              if (ones - 1 >= 0) {
                currentSquares[this.state.bufferId - 1] = "smallSquareBright";
                this.setState({
                  squares: currentSquares,
                  bufferId: this.state.bufferId - 1
                });
              }
              if (ones == 0) {
                this.setState({
                  numberOfAction : 1
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 1) {

            // Go right
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              if (ones + 1 <= 9) {
                currentSquares[this.state.bufferId + 1] = "smallSquareBright";
                this.setState({
                  squares: currentSquares,
                  bufferId: this.state.bufferId + 1
                });
              }
              if (ones == 9) {
                this.setState({
                  numberOfAction : 2
                });
              }
            },50);
          } else {

            // random
            setTimeout(() => {
              let randomNumber = Math.floor(Math.random() * 100);
              while (currentSquares[randomNumber] === "smallSquareBright") {
                randomNumber = Math.floor(Math.random() * 100);
              }
              currentSquares[randomNumber] = "smallSquareBright";
              this.setState({
                squares: currentSquares,
                numberOfAction : 0,
                bufferId : randomNumber
              });
            }, 50);
          }
        }

      } else {

        //--check if all squares are already dark
        for (let i = 0; i<100; i++) {
          if (currentSquares[i] !== darkColor) {
            bDarkness = false;
          }
        }

        if (bDarkness) {
          this.setState({direction : "dark-bright"});
          this.setState({startAction : false});
          this.setState({numberOfAction : 0});
          console.log("Game Two done.");
        } else {


          if (this.state.numberOfAction == 0) {
            // Go Up
            setTimeout(() => {
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens - 1 >= 0) {
                currentSquares[this.state.bufferId - 10] = "smallSquareDark";
                this.setState({
                  squares: currentSquares,
                  bufferId: this.state.bufferId - 10
                });
              }
              if (tens == 0) {
                this.setState({
                  numberOfAction: 1
                });
              }
            }, 50);
          } else if (this.state.numberOfAction == 1) {
            // Go Down
            setTimeout(() => {
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens + 1 <= 9) {
                currentSquares[this.state.bufferId + 10] = "smallSquareDark";
                this.setState({
                  squares: currentSquares,
                  bufferId: this.state.bufferId + 10
                });
              }
              if (tens == 9) {
                this.setState({
                  numberOfAction: 2
                });
              }
            }, 50);
          } else {
            //random
            setTimeout(() => {
              let randomNumber = Math.floor(Math.random() * 100);
              while (currentSquares[randomNumber] === "smallSquareDark") {
                randomNumber = Math.floor(Math.random() * 100);
              }
              currentSquares[randomNumber] = "smallSquareDark";
              this.setState({
                squares: currentSquares,
                numberOfAction : 0,
                bufferId: randomNumber
              });
            }, 50);
          }


        }

      }
    }
  }
  gameThree() {

    let currentSquares = this.state.squares;
    let bDarkness = true;
    let bBrightness = true;
    let darkColor = "smallSquareDark";
    let brightColor = "smallSquareBright";

    if (this.state.startAction) {
      if (this.state.direction === "dark-bright") {

        //--check if all squares are already bright
        for (let i = 0; i < 100; i++) {
          if (currentSquares[i] !== brightColor) {
            bBrightness = false;
          }
        }

        if (bBrightness) {
          this.setState({direction: "bright-dark"});
          this.setState({startAction: false});
          this.setState({numberOfAction: 0});
          console.log("Game Three done.");
        } else {

          if (this.state.numberOfAction == 0) {

            // Go Right Up
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens - 1 >= 0 && ones + 1 <= 9) {
                currentSquares[this.state.bufferId - 9] = "smallSquareBright";
                this.setState({
                  squares: currentSquares,
                  bufferId: this.state.bufferId - 9
                });
              }
              if (tens == 0 || ones == 9) {
                this.setState({
                  numberOfAction: 1,
                  bufferId: this.state.bufferIdConst
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 1) {

            // Go Right Down
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens + 1 <= 9 && ones + 1 <= 9) {
                currentSquares[parseInt(this.state.bufferId) + 11] = "smallSquareBright";
                this.setState({
                  squares : currentSquares,
                  bufferId : parseInt(this.state.bufferId) + 11
                });
              }
              if (tens == 9 || ones == 9) {
                this.setState({
                  numberOfAction: 2,
                  bufferId: this.state.bufferIdConst
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 2) {

            // Go Left Down
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens + 1 <= 9 && ones - 1 >= 0) {
                currentSquares[parseInt(this.state.bufferId) + 9] = "smallSquareBright";
                this.setState({
                  squares : currentSquares,
                  bufferId : parseInt(this.state.bufferId) + 9
                });
              }
              if (tens == 9 || ones == 0) {
                this.setState({
                  numberOfAction : 3,
                  bufferId : this.state.bufferIdConst
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 3) {

            // Go Left Up
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens - 1 >= 0 && ones - 1 >= 0) {
                currentSquares[parseInt(this.state.bufferId) - 11] = "smallSquareBright";
                this.setState({
                  squares : currentSquares,
                  bufferId : parseInt(this.state.bufferId) - 11
                });
              }
              if (tens == 0 || ones == 0) {
                this.setState({
                  numberOfAction: 4,
                  bufferId: this.state.bufferIdConst
                });
              }
            }, 50);

          } else {

            // random
            setTimeout(() => {
              let randomNumber = Math.floor(Math.random() * 100);
              while (currentSquares[randomNumber] === "smallSquareBright") {
                randomNumber = Math.floor(Math.random() * 100);
              }
              currentSquares[randomNumber] = "smallSquareBright";
              this.setState({
                squares: currentSquares,
                numberOfAction : 0,
                bufferId : randomNumber,
                bufferIdConst : randomNumber
              });
            }, 50);
          }
        }

      } else {

        //--check if all squares are already bright
        for (let i = 0; i < 100; i++) {
          if (currentSquares[i] !== darkColor) {
            bDarkness = false;
          }
        }

        if (bDarkness) {
          this.setState({direction: "dark-bright"});
          this.setState({startAction: false});
          this.setState({numberOfAction: 0});
          console.log("Game Three done.");
        } else {

          if (this.state.numberOfAction == 0) {

            // Go Right Up
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens - 1 >= 0 && ones + 1 <= 9) {
                currentSquares[this.state.bufferId - 9] = "smallSquareDark";
                this.setState({
                  squares: currentSquares,
                  bufferId: this.state.bufferId - 9
                });
              }
              if (tens == 0 || ones == 9) {
                this.setState({
                  numberOfAction: 1,
                  bufferId: this.state.bufferIdConst
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 1) {

            // Go Right Down
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens + 1 <= 9 && ones + 1 <= 9) {
                currentSquares[parseInt(this.state.bufferId) + 11] = "smallSquareDark";
                this.setState({
                  squares : currentSquares,
                  bufferId : parseInt(this.state.bufferId) + 11
                });
              }
              if (tens == 9 || ones == 9) {
                this.setState({
                  numberOfAction: 2,
                  bufferId: this.state.bufferIdConst
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 2) {

            // Go Left Down
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens + 1 <= 9 && ones - 1 >= 0) {
                currentSquares[parseInt(this.state.bufferId) + 9] = "smallSquareDark";
                this.setState({
                  squares : currentSquares,
                  bufferId : parseInt(this.state.bufferId) + 9
                });
              }
              if (tens == 9 || ones == 0) {
                this.setState({
                  numberOfAction : 3,
                  bufferId : this.state.bufferIdConst
                });
              }
            }, 50);

          } else if (this.state.numberOfAction == 3) {

            // Go Left Up
            setTimeout(() => {
              let ones = this.state.bufferId % 10;
              let tens = Math.floor(this.state.bufferId / 10);
              if (tens - 1 >= 0 && ones - 1 >= 0) {
                currentSquares[parseInt(this.state.bufferId) - 11] = "smallSquareDark";
                this.setState({
                  squares : currentSquares,
                  bufferId : parseInt(this.state.bufferId) - 11
                });
              }
              if (tens == 0 || ones == 0) {
                this.setState({
                  numberOfAction: 4,
                  bufferId: this.state.bufferIdConst
                });
              }
            }, 50);

          } else {

            // random
            setTimeout(() => {
              let randomNumber = Math.floor(Math.random() * 100);
              while (currentSquares[randomNumber] === "smallSquareDark") {
                randomNumber = Math.floor(Math.random() * 100);
              }
              currentSquares[randomNumber] = "smallSquareDark";
              this.setState({
                squares: currentSquares,
                numberOfAction : 0,
                bufferId : randomNumber,
                bufferIdConst : randomNumber
              });
            }, 50);
          }
        }

      }
    }
  }
  ////////////////////////////////



  render() {

    let squares = [];
    for (let i = 0; i < 100; i++) {
      squares.push(<Square id={i} className={this.state.squares[i]} onPress={this.checkerGameIsChosen} key={i} />);
    }

    return (
        <div>
          <div className="biggestSquare">
            {squares}
          </div>
          <ControlPanel onPress={this.gameSwitcher}/>
        </div>
    );
  }

}

export default App;
