import { Component, OnInit } from '@angular/core';
import { Recensione } from '../model/Recensione';
import { ServerService } from '../server.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../model/User';

@Component({
  selector: 'app-scheda-recensioni',
  templateUrl: './scheda-recensioni.component.html',
  styleUrls: ['./scheda-recensioni.component.css']
})
export class SchedaRecensioniComponent implements OnInit {
  
  showComments: boolean = false;
  miaRecensione: boolean = false;
  public recensioni: Recensione[] = [];
  descrRecensione: string = "";
  public form: FormGroup;
  rating3: number;
  sessionId: string = "";
  userLogged: User | null = null;

  cancellaRecensione(index: number){
    this.server.eliminaRecensione(this.recensioni[index].id).subscribe(ok => {
      if(ok) {
        this.recensioni.splice(index, 1);
        this.miaRecensione = false;
      }
    });
  }

  toggleComments() {
    this.showComments = !this.showComments;  
  } 

  creaRecensione() {
    if(this.miaRecensione === false) {
      if(this.descrRecensione != ""){
      const miaRecensione: Recensione = {id: 0, descrizione: this.descrRecensione, voto: this.form.value.rating1, numMiPiace: 0, numNonMiPiace: 0, commenti: [], userId: 0, username: "", userImg: ""};
      this.server.addReview(this.sessionId, miaRecensione).subscribe(ok => {
        if(ok) {
          this.miaRecensione = true;
          this.recensioni.splice(0, 0, miaRecensione);
        }
      });
      } else {
        alert("Inserire voto e recensione")
      }
    }
    else {
      alert("Recensione su questo libro già presente!");
    }
  }

  svuotaCampi() {
    this.descrRecensione = "";
    this.form.value.rating1 = 0;
    console.log("rat: " +  this.form.value.rating1);
  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    var sessionid = urlParams.get("jsessionid");
    if(sessionid != null) {
      this.sessionId = sessionid;
    }
    let parentThis = this;

    this.server.getRecensioni(this.sessionId).subscribe(r => {
      this.recensioni = r;
    });

      this.server.getUser(this.sessionId).subscribe(u => {
        parentThis.userLogged = u;
      });

      for(let i = 0; i < this.recensioni.length; i++) {
        this.server.getScrittoreRecensione(this.recensioni[i].id).subscribe(u => {
          parentThis.recensioni[i].username = u.username;
          parentThis.recensioni[i].userImg = "data:image/png;base64, " + u.userImage;
          parentThis.recensioni[i].userId = u.id;
          console.log("u: " + parentThis.recensioni[i].id + " - " + parentThis.recensioni[i].username);          
        });
      }
      console.log("utente per rec");
      console.log("rec-length: " + this.recensioni.length);
      console.log("rec0-userId: " + this.recensioni[0].userId);
      if(this.userLogged) {
        console.log("rec-userLogged: " + this.userLogged.id);
      }
      if(this.recensioni.length > 0 && this.recensioni[0].userId === this.userLogged?.id)  {
        console.log(this.recensioni[0].userId +" e " + this.userLogged.id);
        this.miaRecensione = true;
        }
      console.log("miarec: " + this.miaRecensione);
  }

  setUserRec(id: number, name: string, img: string, index: number) {
    
  }
  constructor(private fb: FormBuilder, private server: ServerService){
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    });
  }
}

