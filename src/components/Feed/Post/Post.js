import React from 'react';
import './styles.css';

import Skeleton from 'react-loading-skeleton';

class Post extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
            
    }

    render() {
        const handleImageLoaded = (e) => {
            setTimeout(async ()=>{
                await this.setState({loaded: true});
                e.target.style = "display:block";
            },3000);
        }
        
        return (
            <div className="post-container">
                <Skeleton/>
                <div class="post">
                    {(this.state.loaded)?<></>:<Skeleton className="fade-out" height={500} width={510}/>}
                    {(this.props.item.mimeType==='image/jpeg'|| this.props.item.mimeType==='image/png')?<img className="blur image" src={this.props.item.baseUrl} onLoad={handleImageLoaded} alt={this.props.item.id} />:<video src={`${this.props.item.baseUrl}`} className="image blur" alt={this.props.item.baseUrl} onLoadStart={handleImageLoaded} controls/>}
                    <div class="post-desc">
                        <Skeleton count={2} width={450} height={20} style={{"marginTop":"1vh"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;