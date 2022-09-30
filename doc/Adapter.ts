//ejecutar con ts-node Adapter.ts

interface Email{
    send(): void;
}

class ProveedorEmail implements Email{
    public send(): void {
        console.log("enviando mail por Proveedor de Email");
    }
}

class ProveedorEmail2{
    public enviarEmail():void{
        console.log("enviando mail por Proveedor de Email 2")
    }
}

class ProveedorEmail2Adapter implements Email{
    constructor(
        private proveedorEmail:ProveedorEmail2
    ){}
    public  send():void {
        this.proveedorEmail.enviarEmail()
    }
}

function enviarEmail( email:Email){
    email.send();
}

// const email = new ProveedorEmail();
const email= new ProveedorEmail2Adapter(new ProveedorEmail2())

enviarEmail(email)