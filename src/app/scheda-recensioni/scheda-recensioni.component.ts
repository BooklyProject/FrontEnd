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
  miaRecensione: Recensione | null = null;
  recensioni: Recensione[] = [];
  descrRecensione: string = "";
  public form: FormGroup;
  rating3: number;
  sessionId: string = "";
  userLogged: User | null = null;

  toggleComments() {
    this.showComments = !this.showComments;  
  } 

  creaRecensione() {
    if(this.miaRecensione == null) {
    this.miaRecensione = {id: 0, descrizione: this.descrRecensione, voto: this.form.value.rating1, numMiPiace: 0, numNonMiPiace: 0, commenti: [], userId: 0, username: "", userImg: ""};
    this.server.addReview(this.sessionId, this.miaRecensione).subscribe(ok => {
      if(ok) {
        if(this.miaRecensione != null) {
          this.recensioni.splice(0, 0, this.miaRecensione);
          console.log("miaRec " + this.miaRecensione)
        }
      }
    });
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

    this.server.getRecensioni(this.sessionId).subscribe(r => {
      this.recensioni = r;
      console.log("recensioni prese");
      this.server.getUser(this.sessionId).subscribe(u => {
        this.userLogged = u;

        for(let rec of this.recensioni) {
          this.server.getScrittoreRecensione(rec.id).subscribe(u => {
            rec.username = u.username;
            rec.userImg = "data:image/png;base64, " + u.userImage;
          });
        }
        console.log("utente per rec");
        if(this.recensioni.length > 0 && this.recensioni[0].userId === this.userLogged?.id)  {
          console.log(this.recensioni[0].userId +" e " + this.userLogged.id);
          this.miaRecensione = this.recensioni[0];
        }
      });
      
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

