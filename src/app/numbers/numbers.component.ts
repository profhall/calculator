import { Component, EventEmitter } from '@angular/core';
import {element} from "protractor";


@Component({
  selector: 'calc-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css']
})
export class NumbersComponent {
    clicked = new EventEmitter();
    private output="0";
    private pending_total=0;
    private pending_value;
    private operator;
    private lastOperator;
    private pendingOperation;
    private newNumber = true;
    private calculated_Total= null;
    private equation = "";
    private previous_equation;

  numberClicked(number){
      //if output is zero replace & output = number
    if(this.output == "0" || this.newNumber)
    {
      this.output = number;
      this.newNumber = false;

    }
    //else concat number and output = new concat number
    else
    {
      this.output += String(number);
    }
    this.pending_value = Number(this.output);
    this.equation += number;
    if(this.calculated_Total)
    {
      this.calculated_Total = null;
    }
    if(this.previous_equation)
    {
      this.previous_equation = null;
    }
  }

  opClicked(operator: string){
      switch (operator) {
          case "-":
              if (this.previous_equation) {
                /**
                 * checks to see if there is a previous equation
                 * if so then it uses the total from the last equation in the new equation
                 */
                  this.equation = String(this.pending_total);
                  this.equation += " - ";
                  this.pendingOperation = '-';
                  this.newNumber = true;
                  this.output = String(this.pending_total);
                  this.pending_value = null;
                }
              else if (!this.newNumber){
                  this.pending_total = eval(this.equation);
                  this.equation += " - ";
                  this.pendingOperation = '-';
                  this.newNumber = true;
                  this.output = String(this.pending_total);
                  this.pending_value = null;
                }
              break;
          case "+":
              if (this.previous_equation){
                this.equation = String(this.pending_total);
                this.equation += " + ";
                this.pendingOperation = '+';
                this.newNumber = true;
                this.output = String(this.pending_total);
                this.pending_value = null;
              }
              else if (!this.newNumber){
                this.pending_total = eval(this.equation);
                this.equation += " + ";
                this.pendingOperation = '+';
                this.newNumber = true;
                this.output = String(this.pending_total);
                this.pending_value = null;
              }
              break;
          case "/":
            if (this.calculated_Total){
              this.equation = String(this.pending_total);
              this.equation += "/";
              this.pendingOperation = '/';
              this.newNumber = true;
              this.output = String(this.pending_total);
              this.pending_value = null;
            }
            else if (!this.newNumber){
              this.pending_total = eval(this.equation);
              this.equation += "/";
              this.pendingOperation = '/';
              this.newNumber = true;
              this.output = String(this.pending_total);
              this.pending_value = null;
            }
            break;
          case "x":
            if (this.calculated_Total){
              this.equation = String(this.pending_total);
              this.equation += " * ";
              this.pendingOperation = '*';
              this.newNumber = true;
              this.output = String(this.pending_total);
              this.pending_value = null;
            }
            else if (!this.newNumber){
              this.pending_total = eval(this.equation);
              this.equation += " * ";
              this.pendingOperation = '*';
              this.newNumber = true;
              this.output = String(this.pending_total);
              this.pending_value = null;
            }
            break;
          case "=":
            //alert('calc');
            if (!this.newNumber && this.pendingOperation ) {
              this.pending_total = eval(this.equation);
              var total = this.pending_total.toFixed(6);
              this.calculated_Total = Number(total.replace("/[0]+$/",''));
              this.output = this.calculated_Total;

              this.newNumber=true;
              this.lastOperator = this.pendingOperation;
              this.pending_value = null;
              this.previous_equation=this.equation;
              this.equation='';
            }
            // you hit calculate with one number and operator
            else if(this.pendingOperation && this.newNumber && !this.pending_value )
            {
              this.pending_total = eval(this.equation.split(/[+-/*]/)[0]);
              total = this.pending_total.toFixed(6);
              this.calculated_Total = Number(total.replace("/[0]+$/",''));
              this.output = this.calculated_Total;

              this.lastOperator = this.pendingOperation;
              this.newNumber=true;
              this.pending_value = null;
              this.previous_equation=eval(this.equation.split(/[+-/*]/)[0]);
              this.equation='';
            }

           /** if (this.pendingOperation = "+") {
              this.calculated_Total = eval(this.equation);
              this.pending_total = this.calculated_Total;
            }
            else if (this.pendingOperation = "-") {
              this.calculated_Total = this.pending_total - this.pending_value;
              this.pending_total = this.calculated_Total;
            }
            else if (this.pendingOperation = "/") {
              this.calculated_Total = this.pending_total + this.pending_value;
              this.pending_total = this.calculated_Total;
            }
            else if (this.pendingOperation = "x") {
              this.calculated_Total = this.pending_total + this.pending_value;
              this.pending_total = this.calculated_Total;
            }**/

      }

  }




}
