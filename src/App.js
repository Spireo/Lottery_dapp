import React, {component} from 'react';
import { Message ,Button, Card, Image,Icon,Statistic,Label} from 'semantic-ui-react'
import web3 from './web3';
import lottery from './lottery'

import 'semantic-ui-css/semantic.min.css'
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            manager:'',
            playerscounts:0,
            balance:0,
        };
    }

    async componentDidMount(){
        const address = await lottery.methods.get_manager().call();
        this.setState({manager:address});
        const playercounts = await lottery.methods.getplayercounts().call();
        this.setState({playercounts:playercounts});
        const balance = await lottery.methods.getbalance().call();
        this.setState({balance:web3.utils.fromWei(balance)});
    }
    enter = async()=>{
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.enter().send({
            from:accounts[0],
            value:1000000000000000000,
        })
    };
    getresult = async()=>{
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.getresult().send({
            from:accounts[0],
        });
    };
    refund = async()=>{
        const accounts = await web3.eth.getAccounts();
        await lottery.methods.refund().send({
            from:accounts[0],
        });
    };
    render() {
        console.log(web3.version)
        return (
            <div className="App">
                <Message info>
                    <Message.Header>Is this what we really want?</Message.Header>
                    <p>Did you know it's been a while?</p>
                </Message>
                <Card.Group>
                    <Card>
                        <Image
                            src='https://cdn4.iconfinder.com/data/icons/gambling-8/140/Gambling_scratch_cards-256.png'
                            wrapped ui={false}/>
                        <Card.Content>
                            <Card.Header>FONO</Card.Header>
                            <Card.Meta>
                                <span className='date'>
                                    管理员地址:
                                      <Label as='a' size = 'Tiny'>
                                          {this.state.manager}
                                      </Label></span>
                            </Card.Meta>
                            <Card.Description>
                                <strong>每周六开奖!</strong>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                {this.state.playercounts} guys joined.
                            </a>
                        </Card.Content>
                        <Card.Content>
                            <Statistic color='red'>
                                <Statistic.Value>{this.state.balance}</Statistic.Value>
                                <Statistic.Label>Ether</Statistic.Label>
                            </Statistic>
                        </Card.Content>
                        <Card.Content>

                            <Button animated fluid onClick={this.enter} loading={false}>
                                <Button.Content visible>Join</Button.Content>
                                <Button.Content hidden>
                                    to win
                                </Button.Content>
                            </Button>
                            <Button animated fluid onClick={this.getresult} loading={false} color={'red'}>
                                <Button.Content visible>开奖</Button.Content>
                                <Button.Content hidden>

                                </Button.Content>
                            </Button>
                            <Button animated fluid onClick={this.refund} loading={false} color={'yellow'}>
                                <Button.Content visible>退钱</Button.Content>
                                <Button.Content hidden>
                                    🥺🥰
                                </Button.Content>
                            </Button>
                        </Card.Content>
                    </Card>
                </Card.Group>

            </div>
        );
    }
}
export default App;