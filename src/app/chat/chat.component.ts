import { Component, signal } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit, OnDestroy} from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { User } from '../clases/User';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  standalone:true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  boton = false;
  mensaje : string = "";
  currentUser: User | null = null;
  private userSub!: Subscription;
  mensajes = signal<any>([]);

  
  constructor(private dbService:DatabaseService,private supaBaseService:SupabaseService,private supaBaseAuth:AuthService) {
    const canal = this.supaBaseService.supabase.channel("table-db-changes");

    canal.on("postgres_changes",{
      event:"*",
      table:"mensajes",
      schema:"public"

    },
    async (cambios: any)=>{
      const {data} = await this.supaBaseService.supabase.from("users").select("name").eq("id",cambios.new["user_id"]);
      cambios.new.users ={name:data![0].name}

      this.mensajes.update((valor_anterior)=>{
        valor_anterior.push(cambios.new);
        return valor_anterior;
      })
    }
  );
  canal.subscribe();
  
  }


  ngOnInit()
  {
    this.cargarMensajes();
    this.userSub = this.supaBaseAuth.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  async cargarMensajes() {
    this.boton = true;
    const data = await this.dbService.traerMensajes();
    this.mensajes.set(data);
  }

  async enviarMensaje ()
  {
    if(this.mensaje.length>0)
    {
      this.dbService.guardarMensaje(this.mensaje,this.currentUser!.id);
      this.mensaje = ""; 

    }
  }
}
