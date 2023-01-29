import { Component, OnInit } from '@angular/core';
import { Recensione, Commento } from '../model/Recensione';
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
  commento: string = "";

  cancellaRecensione(index: number){
    this.server.eliminaRecensione(this.recensioni[index].id).subscribe(ok => {
      if(ok) {
        this.recensioni.splice(index, 1);
        this.miaRecensione = false;
      }
    });
  }

  toggleComments(index: number) {
    this.recensioni[index].showComments = !this.recensioni[index].showComments;
  } 

  creaRecensione() {
    if(this.miaRecensione === false) {
      if(this.descrRecensione != ""){
      const miaRecensione: Recensione = {id: 0, descrizione: this.descrRecensione, voto: this.form.value.rating1, numMiPiace: 0, numNonMiPiace: 0, commenti: [], userId: 0, username: "", userImg: "", showComments: false};
      this.server.addReview(this.sessionId, miaRecensione).subscribe(id => {
        if(id) {
          this.miaRecensione = true;
          console.log("id rec: " + id);
          miaRecensione.id = id;
          if(this.userLogged) {
            miaRecensione.username = this.userLogged?.username;
            miaRecensione.userImg = "data:image/png;base64, " + this.userLogged.userImage;
            miaRecensione.userId = this.userLogged.id;
            console.log("u: " + miaRecensione.id + " - " + miaRecensione.username);
            this.recensioni.splice(0, 0, miaRecensione);
          }
           
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
    this.commento = "";
  }

  aggiungiCommento(index: number) {
    if(this.commento) {
      this.server.addComment(this.sessionId, this.recensioni[index].id, this.commento).subscribe(i => {
        if(i) {
          if(this.userLogged) {
            var commento: Commento = {id: i, descrizione: this.commento, numMiPiace: 0, numNonMiPiace: 0, username: this.userLogged?.username, userImg: this.userLogged.userImage, userId: this.userLogged.id};
            this.recensioni[index].commenti.push(commento);
            this.svuotaCampi();
          }
        }
      });
    }
  }

  cancellaCommento(index: number) {

  }

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    var sessionid = urlParams.get("jsessionid");
    if(sessionid != null) {
      this.sessionId = sessionid;
    }

    this.server.getRecensioni(this.sessionId).subscribe(r => {
      this.recensioni = r;

      this.server.getUser(this.sessionId).subscribe(u => {
        this.userLogged = u;
      });

      for(let i = 0; i < this.recensioni.length; i++) {
        this.server.getScrittoreRecensione(this.recensioni[i].id).subscribe(u => {
          this.recensioni[i].username = u.username;
          this.recensioni[i].userImg = "data:image/png;base64, " + u.userImage;
          this.recensioni[i].userId = u.id;
          console.log("u: " + this.recensioni[i].id + " - " + this.recensioni[i].username); 
          if(this.recensioni[i].userId === this.userLogged?.id) {
            console.log(this.recensioni[0].userId + " e " + this.userLogged.id);
            this.miaRecensione = true;
          }         
        });

        this.server.getCommenti(this.recensioni[i].id).subscribe(c => {
          this.recensioni[i].commenti = c;
        });
      }
      console.log("utente per rec");
      console.log("rec-length: " + this.recensioni.length);
      //console.log("rec0-userId: " + this.recensioni[0].userId);
      console.log("miarec: " + this.miaRecensione);
    });
  }

  constructor(private fb: FormBuilder, private server: ServerService){
    this.rating3 = 0;
    this.form = this.fb.group({
      rating1: ['', Validators.required],
      rating2: [4]
    });
  }
}

