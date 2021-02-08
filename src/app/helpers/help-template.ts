export const template = [
  {
    html: `<h2>
            <i class="fa fa-user-o"></i>
          </h2>
          
          <h3>
            Empezá cargando tu información financiera
          </h3>
        
        
        <div class="card-body">
        <h3 class="card-title">
        <i class="fa fa-money"></i> Información financiera 
        </h3>
        <table id="user" class="table" style="clear: both;">
        
        <tbody>
        <tr>
        <td>Simbolo de moneda preferido</td>
        <td><input autocomplete="off" disabled type="text" value="$" class="form-control form-material col-8 mx-auto"></td>
        
        </tr>
        
        <tr>            
        <td>¿Cuanto cobrás?</td>
        <td><input autocomplete="off" disabled value="5000" type="number" class="form-control col-8 mx-auto"></td>
        </tr>
        
        <tr>
        <td>Quiero ahorrar</td>
        <td>
        <div class="checkbox checkbox-success"><input disabled checked type="checkbox">
        <label></label>
        </div></td></tr><tr><td> ¿Cuánto querés ahorrar?</td><td><div class="col-8 mx-auto"><select disabled name="percent" id="percent" class="custom-select col-12">
        <option selected value="5">5%</option>
        <option value="10">10%</option>
        </select><label for="checkbox1"></label></div></td></tr><tr><td> ¿Qué dia cobrás? </td><td><div class="col-8 mx-auto"><select disabled id="inlineFormCustomSelect" class="custom-select col-12"><option selected>3</option>
        </select></div></td></tr>
        </tbody></table></div>`

  },
  {
    html: `<h3>
            Al guardar tu información, te preguntaremos si querés crear automáticamente un movimiento para cada mes según tus datos de salario y ahorro.
        </h3>
        <h4>
          Para consultar todos tus movimientos tocá <i class="fa fa-list-ul"></i>
        </h4>`
  },
  {
    html: `
    <h2>
    <i class="fa fa-list-ul"></i>
    </h2>

    <h3>
      Hay dos tipos de movimientos:
      <br>
      <strong>Ingresos</strong> ( <i class="fa fa-share text-success"></i> ) : Añaden un valor positivo (suman).
      <br>
      <strong>Gastos</strong> ( <i class="fa fa-reply text-danger"></i> ): Añaden un valor negativo (restan).
    </h3>

    <h4>
      Aquí un ejemplo:
    </h4>

    <div class="row p-1">
                <i class="fa fa-share text-success ml-1 mr-1 align-self-center" style="font-size: 13px;"></i>
                <div class="col-4 col-sm-4 col-md-4 margin-x6">
                    <span class="text-dark" style="font-size: 15px;">
                        <strong>
                            Aguinaldo
                        </strong>
                    </span><br>
                    <span style="font-size: 12px;">Aguinaldo decembrino</span>
                </div>
                <div class="col col-sm-3 col-md-4 text-right align-self-center">
                    <span class="text-muted" style="font-size: 10px;">U$</span>
                    <span style="font-size: 18px;">
                        800
                    </span>
                </div>
                <div class="col col-sm-4 col-md-3 text-right align-self-center" style="font-size: 13px;">
                    <i class="fa fa-edit margin-x6"></i>
                    <i class="fa fa-trash"></i>
                </div>
    </div>

    <div class="row p-1">
                <i class="fa fa-reply text-danger ml-1 mr-1 align-self-center" style="font-size: 13px;"></i>
                <div class="col-4 col-sm-4 col-md-4 margin-x6">
                    <span class="text-dark" style="font-size: 15px;">
                        <strong>
                            Alquiler
                        </strong>
                    </span><br>
                    <span style="font-size: 12px;">Pago mes enero</span>
                </div>
                <div class="col col-sm-3 col-md-4 text-right align-self-center">
                    <span class="text-muted" style="font-size: 10px;">U$</span>
                    <span style="font-size: 18px;">
                        1500
                    </span>
                </div>
                <div class="col col-sm-4 col-md-3 text-right align-self-center" style="font-size: 13px;">
                    <i class="fa fa-edit margin-x6"></i>
                    <i class="fa fa-trash"></i>
                </div>
    </div>     





    <br>
    <h4>
      También podés editar un movimiento ( <i class="fa fa-edit"></i> ) o eliminarlo ( <i class="fa fa-trash"></i> )
    </h4>
    `
  },
  {
    html: `
    <h3>
      Para crear un nuevo movimiento usá el botón: <i class="fa fa-plus"></i>
    </h3>

    <div class="mx-auto w75 text-center">
                <div class="col-11 text-left">
                    <div class="form-group m-b-10">
                        <label for="input6">Tipo de movimiento</label>
                        <select disabled formControlName="type" class="form-control p-0">
                            <option selected value="ingreso">Ingreso</option>                                
                        </select>
                        <span class="bar"></span>
                    </div>
                </div>
                <div class="col-11 text-left">
                    <div class="form-group m-b-10">
                        <label for="input8">Monto</label>
                        <input formControlName="amount" disabled value="350" type="number" class="form-control">
                        <span class="bar"></span>
                    </div>
                </div>
            

            
                <div class="col-11 text-left">
                    <div class="form-group m-b-10">
                        <label class="text-left">Categoria</label>
                        <select disabled formControlName="category" class="form-control p-0" >
                        
                        <option selected value="Transporte">Transporte</option>
                                                      
                        </select><span class="bar"></span>
                    </div>
                </div>                    

                <div class="col-11 text-left">
                    <label for="input0">Comentario</label>
                    <input type="text" disabled value="Taxi" formControlName="comment" class="form-control">

                </div>
                </div>
       
    


    <div class="mt-3">
    <ul id="help-list">
    <li class="text-left mb-1"><strong>Tipo de movimiento</strong>: Ingreso o Gasto.</li>
    <li class="text-left mb-1"><strong>Monto</strong>: Valor del movimiento.</li>
    <li class="text-left mb-1"><strong>Categoría</strong>: Si no existe la categoría que necesitás, usá "otra" y escribí el nombre para guardarla.</li>
    <li class="text-left mb-1"><strong>Comentario</strong>: Opcional.</li>
    </ul>
    </div>
    `
  }
]