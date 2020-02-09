import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TextInput from './TextInput.js';
import validate from './validations.js';
import TextArea from './TextArea.js';
import InputMask from 'react-input-mask';

class FormComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        formControls: {
            nome: {
                value: '',
                placeholder: 'What is your name',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true
                }
            },
            phone: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 11,
                    isRequired: true //just added this
                }
            },
            cep: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    exactLen: 8,
                    isRequired: true //just added this
                }
            },
            numero: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true //just added this
                }
            },
            logradouro: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true //just added this
                }
            },
            bairro: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true //just added this
                }
            },
            cidade: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true //just added this
                }
            },
            assunto: {
                value: '',
                valid: false,
                touched: false,
                validationRules: {
                    isRequired: true
                }
            },
            texto: {
                value: '',
                placeholder: 'Escreva seu texto',
                valid: false,
                touched: false,
                validationRules: {
                    minLength: 1,
                    isRequired: true
                }
            },


        }
    }
  }


  changeHandler = event => {

      const name = event.target.name;
      const value = event.target.value;

      const updatedControls = {
  	       ...this.state.formControls
      };
      const updatedFormElement = {
  	       ...updatedControls[name]
      };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

      this.setState({
      	formControls: updatedControls
      });
  }

  changeCepHandler = event => {

      const name = event.target.name;
      const value = event.target.value;

      const updatedControls = {
             ...this.state.formControls
      };
      const updatedFormElement = {
             ...updatedControls[name]
      };

        updatedFormElement.value = value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        if (updatedFormElement.valid) {
                var xhr = new XMLHttpRequest()

                xhr.addEventListener('load', () => {
                    var resp = JSON.parse(xhr.responseText)

                    var rua = resp.logradouro
                    var bairro = resp.bairro
                    var cidade = resp.localidade

                    this.setState(prevState => {
                        let formControls = { ...prevState.formControls };  // creating copy of state variable jasper
                        formControls.logradouro.value = rua;
                        formControls.bairro.value = bairro;
                        formControls.cidade.value = cidade                 // update the name property, assign a new value
                        return { formControls };                                 // return new object jasper object
                    })

                })
                xhr.open('GET', 'https://viacep.com.br/ws/' + value + '/json')
                xhr.send()
        }


        updatedControls[name] = updatedFormElement;

      this.setState({
          formControls: updatedControls
      });
  }

  render () {
    return (
      <form>
          Nome:
          <TextInput
                 type="texto"
                 name="nome"
                 value={this.state.formControls.nome.value}
                 onChange={this.changeHandler}
                 touched={this.state.formControls.nome.touched}
                 valid={this.state.formControls.nome.valid}
          />

          Telefone:
          <br />
          <InputMask
          type="num"
          {...this.props}
          mask="(99) 99999\-9999"
          maskChar=" "
          />
          <br />



          CEP:
          <TextInput
                 type="texto"
                 name="cep"
                 value={this.state.formControls.cep.value}
                 onChange={this.changeCepHandler}
                 touched={this.state.formControls.cep.touched}
                 valid={this.state.formControls.cep.valid}

          />

          Logradouro:
          <TextInput
                 type="texto"
                 name="logradouro"
                 value={this.state.formControls.logradouro.value}
                 onChange={this.changeHandler}
                 touched={this.state.formControls.logradouro.touched}
                 valid={this.state.formControls.logradouro.valid}
          />

          Numero:
          <TextInput
                 type="texto"
                 name="numero"
                 value={this.state.formControls.numero.value}
                 onChange={this.changeHandler}
                 touched={this.state.formControls.numero.touched}
                 valid={this.state.formControls.numero.valid}
          />

          Bairro:
          <TextInput
                 type="texto"
                 name="bairro"
                 value={this.state.formControls.bairro.value}
                 onChange={this.changeHandler}
                 touched={this.state.formControls.bairro.touched}
                 valid={this.state.formControls.bairro.valid}
          />

          Cidade:
          <TextInput
                 type="texto"
                 name="cidade"
                 value={this.state.formControls.cidade.value}
                 onChange={this.changeHandler}
                 touched={this.state.formControls.cidade.touched}
                 valid={this.state.formControls.cidade.valid}
          />

          <br />
          <br />


          Assunto:
          <select
            name="assunto"
            type="select"
            value={this.state.formControls.assunto.value}
            onChange={this.changeHandler}>
            touched={this.state.formControls.cidade.touched}
            <option value="Financeiro">Financeiro</option>
            <option value="Contato">Contato</option>
            <option value="Outros">Outros</option>
          </select>

          <br />
          Texto:
          <TextArea
            name="texto"
            placeholder={this.state.formControls.texto.placeholder}
            value={this.state.formControls.texto.value}
            onChange={this.changeHandler}
            touched={this.state.formControls.texto.touched}
            valid={this.state.formControls.texto.valid}
             />

            <button type="submit" onClick={this.formSubmitHandler}> Submit </button>

      </form>

    );
  }
}


export default TextInput;

ReactDOM.render(
  <FormComponent />,
  document.getElementById('root')
);
