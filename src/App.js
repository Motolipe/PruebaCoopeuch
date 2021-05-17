import React, { Component } from 'react';
import './App.css';
import { MantenedorService } from './service/MantenedorService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';




import 'primereact/resources/themes/nova-alt/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default class App extends Component{

  
  constructor(){
    super();
    this.state = {
      visible : false,
      mantenedor : {
        identificacion: null,
        descripcion: null,
        vigente: null
      },
      selectcMantenedor : {
        
      },
      estadoItems: [
        {label: 'Activo', value: true},
        {label: 'No activo', value: false}
      ]
      
    };
    this.items = [
     {
        label : 'Nuevo',
        icon : 'pi pi-fw pi-user-plus',
        command : () => {this.showSaveDialog()}
     },
      
     { label : 'Editar',
      icon : 'pi pi-fw pi-pencil',
      command : () => {this.showEditDialog()}
     },
     
     {
      label:'Eliminar',
      icon:'pi pi-fw pi-trash',
      command : () => {this.delete()}
     }
    ];
    this.mantenedorService = new MantenedorService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    this.footer = (
      <div>
       <Button label="Guardar" icon="pi pi-check" onClick={this.save} /> 
      </div>  
    );
    
    
  }

  

  componentDidMount(){
    this.mantenedorService.getListar().then(data => this.setState({mantenedores: data}))
    
  }

  save(){
    this.mantenedorService.save(this.state.mantenedor).then(data => {
      this.setState({
        visible : false,
        mantenedor : {
          identificacion: null,
          descripcion: null,
          vigente: null
        }
      });
      this.mantenedorService.getListar().then(data => this.setState({mantenedores: data}))
      document.getElementById('mantenedor-form').reset();
    })
  }

  delete(){
    if(window.confirm("¿Realmente desea eliminar el registro?")) {
      this.mantenedorService.delete(this.state.selectcMantenedor.identificacion).then(data =>{
        this.mantenedorService.getListar().then(data => this.setState({mantenedores: data}));
      });
    }
  }

  render(){
    return(
      <div style={{width: '80', margin: '0 auto', marginTop: '20px'}}>
       <Menubar model={this.items}/>
       <br/>
     <Panel header="Mantenedor">
      <DataTable value={this.state.mantenedores} paginator="true" rows="4" selectionMode="single" selection={this.state.selectcMantenedor} onSelectionChange={e => this.setState({ selectcMantenedor: e.value })}>
        <Column field="identificacion" header="identificacion"></Column>
        <Column field="descripcion" header="descripcion"></Column>
        <Column field="vigente" header="vigente"></Column>
        <Column field="fechaCreacion" header="fechaCreacion"></Column>
      </DataTable>
    </Panel>
    
    <Dialog header="Crear registro" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({visible: false})}>
    
    <form id="mantenedor-form">
      <span className="p-float-label">
        <InputText value={this.state.mantenedor.descripcion} style={{width : '100%'}}  id="descripcion" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState => {
            let mantenedor = Object.assign({}, prevState.mantenedor);
            mantenedor.descripcion = val;

            return { mantenedor };
          })}
         } />
          
          
          <label htmlFor="descripcion">Descripción</label>
      </span>
      <br/>
      <br/>
      <span className="p-float-label">
      <Dropdown value={this.state.mantenedor.vigente}  placeholder="Select" options={this.state.estadoItems} onChange={(e) => {
      let val = e.target.value;
      this.setState(prevState => {
        let mantenedor = Object.assign({}, prevState.mantenedor);
        mantenedor.vigente = val;

        return { mantenedor };
      })} 
      }/>
      </span>
      </form>      
    </Dialog>
    
    </div>
    );
  }

  showSaveDialog(){
    this.setState({
      visible : true,
      mantenedor : {
        identificacion: null,
        descripcion: null,
        vigente: null
      }
    });
    
  }

  showEditDialog(){
    this.setState({
      visible : true,
      mantenedor : {
        identificador : this.state.selectcMantenedor.identificador,
        descripcion: this.state.selectcMantenedor.descripcion,
        vigente: this.state.selectcMantenedor.vigente
      }
    })
    
  }

}