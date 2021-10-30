import React from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import './styles.css';
import axios from 'axios';
import Post from './Post/Post';
import $ from 'jquery';
import Skeleton from 'react-loading-skeleton';


class Feed extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            token: '',
            user: {},
            isLoggedIn: false,
            photos: [],
            nextPageToken: ''
        };
    }

    componentDidMount() {
        const nextPage = () => {
            axios
              .get(`https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=100&pageToken=${this.state.nextPageToken}`, 
              {
                  headers: {
                      Authorization: `Bearer ${this.state.token}`,
                  }
              })
              .then(res => {
                  var currentPhotos = this.state.photos;
                  console.log(res.data);
                  this.setState({
                      ...this.state,
                      photos: currentPhotos.concat(res.data.mediaItems),
                      nextPageToken: res.data.nextPageToken
                  })
              })
              .catch(err => console.error(err)); 
        }

        $(window).scroll(async () => {
            $('#loading').style="display:flex";
            console.log($(window).scrollTop());
            if($(window).scrollTop() + $(window).height() === $(document).height() ) {
               await nextPage();
               $('#loading').style="display:none";
            }
         });
    }

    render() {
        const resGoogle = async (res) => {
            // console.log(res.profileObj, res.accessToken);
            await this.setState({
                token: res.accessToken,
                user: res.profileObj,
                isLoggedIn: true,
                photos: [],
                nextPageToken: ''
            });
            console.log(this.state.user);
            fetchAllPhotos(); 
        }

        const loginFail = (res) => {
            console.log(res);
            this.setState();
        }   

        const fetchAllPhotos = () => {
            axios.get(`https://photoslibrary.googleapis.com/v1/mediaItems?pageSize=100`, {
                headers: {
                    Authorization: `Bearer ${this.state.token}`,
                }
            })
            .then((res)=>{
                console.log(res.data);
                this.setState({...this.state, photos: res.data.mediaItems, nextPageToken: res.data.nextPageToken})
            })
            .catch(err=>console.log(err));  


        }

        const logout = () => {
            this.setState({
                ...this.state,
                user: {},
                token: '',
                isLoggedIn: false
            });
        }
        

        

        return (
            <>
            
                
            <div className="feed-container">
                <div className="feed-status">
                    <div className="user-image-container">
                        {(!this.state.isLoggedIn)?<Skeleton duration={3} circle={true} height={75} width={75}/>
                        :<img className="fade user-image" src={this.state.user.imageUrl} alt={this.state.user.name} onLoad={(e)=>e.target.style="display:block"}/>}
                    </div>
                    <div className="user-name">
                        
                        {(!this.state.isLoggedIn)?<Skeleton duration={3} height={40} width={200} count={1}/>:this.state.user.name}
                    </div>
                    {
                    (!this.state.isLoggedIn)?<GoogleLogin
                        clientId = "887668645917-meejcscpovrnre2l52b8dp9m5qcldtb8.apps.googleusercontent.com"
                        buttonText = "Login with Google"
                        scope="https://www.googleapis.com/auth/photoslibrary" 
                        onSuccess = {resGoogle}
                        prompt="consent"
                        onFailure = {loginFail} 
                        cookiePolicy = "single_host_origin"
                        isSignedIn={true}

                        
                    />:
                    <GoogleLogout
                        clientId="887668645917-meejcscpovrnre2l52b8dp9m5qcldtb8.apps.googleusercontent.com"
                        cookiePolicy = "single_host_origin"
                        onLogoutSuccess={logout}
                    />}
                    <button onClick={fetchAllPhotos}>Refresh</button>
                </div>
                <div className="feed-content">
                    
                    {this.state.photos.map((item, i) => (
                        <Post item={item} key={i+1}/>    
                    ))}
                </div>
                <div className="page-nav-container">
                    
                </div>
                <div id="loading">
                    <div className="donut"></div>
                </div>
                <div className="feed-footer">
                    
                </div>
            </div>
            
            
            </>
        );
    }
}


export default Feed;

