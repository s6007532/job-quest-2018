import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Row, Col, ListGroup, Button, ButtonGroup, ToggleButton, ToggleButtonGroup, ButtonToolbar, InputGroup, FormControl, Container } from 'react-bootstrap';

export default class JokeJobs extends React.Component {

   constructor(props) {
      super(props)
      this.state = { howmany: 1, fname: '', lname: '', selectedGenre: [], fetched: [] }
   }

   handleHowmanyNumInsert = e => {
      const ne = Number(e.target.value)
      console.log(ne, this.state.howmany)
      if (1 <= ne && ne <= 10) {
         this.setState({ howmany: ne })
      }
   }
   handleHowmanyButClick = (e) => {

      const n = this.state.howmany + Number(e.target.value)
      console.log(n)
      if (1 <= n && n <= 10) {
         this.setState({ howmany: n })
      }
   }
   handleNameChange = (e) => {
      if (e.target.id === "fname") {
         this.setState({ fname: e.target.value })
      } else if (e.target.id === "lname") {
         this.setState({ lname: e.target.value })
      }
   }

   handleGenreChange = (e) => {
      this.setState({ selectedGenre: e })
   }

   presentList = () => {
      const jobj = this.state.fetched
      
      const pre = jobj.map(x => <ListGroup.Item>{x.joke.replace("&quot;",'"')} <Badge variant={(x.tag === "normal")?"secondary" : (x.tag==="explicit")? "warning":"success"}>{x.tag}</Badge></ListGroup.Item>)
      return (<ListGroup>{pre}</ListGroup>)
   }

   handleFetchOrder = () => {
      const howmany = String(this.state.howmany)
      const fname = (this.state.fname) ? this.state.fname : "Chuck"
      const lname = (this.state.lname) ? this.state.lname : "Norris"
      const genre = (this.state.selectedGenre.length) ? "&limitTo=[" + this.state.selectedGenre.join(',') + "]" : ''
      const request = 'http://api.icndb.com/jokes/random/' + howmany + "?firstname=" + fname + "&lastname=" + lname + genre
      //console.log(request)
      fetch(request)
         .then(resp => { return resp.json() })
         .then(jsn => { return jsn.value })
         .then(val => {
            let tmp = []
            val.forEach(ele => {
               tmp = tmp.concat([{joke: ele.joke , tag : (ele.categories.length)? ele.categories[0] : 'normal' }])
            })
            this.setState({ fetched: tmp })
         })
   }

   getStateCheck = () => {
      console.log(this.state)
   }

   render() {
      return (<div>
         <Container fluid >
            <Row>
               <Col><h2>Option</h2></Col>
            </Row>

            <Row>
               <Col  md={{ span: 4, offset:  0}} sm={{ span: 6, offset:  0}}>
                  <InputGroup >
                     <InputGroup.Prepend onClick={this.handleHowmanyButClick}>
                        <Button variant="outline-danger" value={-1} >less -</Button>
                        <Button variant="outline-primary" value={1} >+ more</Button>
                     </InputGroup.Prepend>
                     <FormControl type="Integer" aria-describedby="basic-addon1" value={this.state.howmany} onChange={this.handleHowmanyNumInsert} />

                  </InputGroup>
               </Col>
               <Col ><label>Select the number of jokes you want</label></Col>
            </Row>

            <Row>
               <Col md={{ span: 4, offset:  0}} sm={{ span: 6, offset:  0}}>
                  <InputGroup>
                     <InputGroup.Prepend >
                      
                        <InputGroup.Text id="finp" >Firstname</InputGroup.Text>
                        <FormControl id="fname" type="text" placeholder="Chuck" aria-describedBy="finp" onChange={this.handleNameChange}></FormControl>
                      
                     
                        <InputGroup.Text id="linp" >Lastname</InputGroup.Text>
                        <FormControl id="lname" type="text" placeholder="Norris" aria-describedBy="linp" onChange={this.handleNameChange}></FormControl>
                       
                     </InputGroup.Prepend>
                  </InputGroup>
               </Col>
               <Col><label>Wanna custom the main charactor?</label></Col>
            </Row>
            <Row>
               <Col md={{ span: 4, offset:  0}} sm ={{ span: 6, offset:  0}}>
                  <ToggleButtonGroup    text-align= "center" type="checkbox" class="btn-group" onChange={this.handleGenreChange}>
                     <ToggleButton variant="outline-success" value="nerdy">Nerdy</ToggleButton>
                     <ToggleButton variant="outline-warning"  value="explicit">Explicit</ToggleButton>
                  </ToggleButtonGroup>
               </Col>
               <Col><label>Which type <br/><i>#Not selecting means prefers every types</i></label></Col>
            </Row>
            <Row><Col><Button onClick={this.handleFetchOrder}>Gimme That Joke</Button></Col></Row>
         </Container>
         <br></br>
         <this.presentList />
         

         

      </div>
      );
   }
}