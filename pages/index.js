import { useEffect, useState } from "react"
import { load, checkBrowser } from '../helpers'

const Home = () => {

    const [ isSupported, setIsSupported ] = useState(false)
    const [ dataClient, setDataClient ] = useState({wallet:"", contract:{}, mintedTokens: []});
    const [ newColor, setNewColor ] = useState('');

    useEffect(()=>{
        if(checkBrowser()){
            setIsSupported(true)
            load().then((res)=>{
                let dataClientResponse = {
                    wallet: res.clientAccount,
                    contract: res.loadedContract,
                    mintedTokens: res.mintedTokens
                }
                setDataClient(dataClientResponse);
            }); 
        }
    },[]);

    const reload = () => window.location.reload();


    const mintToken = async () => {
        if(newColor.length !== 7){
            alert('Your token must have a length of 7');
        }

        if(newColor.length === 7){
            await dataClient.contract.mint(newColor, {from: dataClient.wallet}); 
            reload();
        }

    }

    return (
        <main className={``}>
            {isSupported && (
                <>
                    <nav className={`flex flex-wrap justify-between h-12 bg-gray-600 text-white items-center px-4`}>
                        <div className={``}>Colors Tokens</div>
                        <div className={``}>{`${dataClient.wallet.slice(0,8)}...${dataClient.wallet.slice(-8)}`}</div>
                    </nav>
                    <section className={`flex flex-col justify-center items-center`}>
                        <h3 className={`text-2xl mt-6 mb-4 text-gray-600`} >Wanna Color?</h3>
                        <div className={`flex flex-row`}>
                            <input 
                                className={`
                                    border-b-2 
                                    bordel-gray-200 
                                    focus:outline-none 
                                    focus:border-gray-400 
                                    px-4 
                                    py-2
                                `} 
                                placeholder="#000000" 
                                maxLength={7} 
                                minLength={7}
                                value={newColor}
                                onChange={(e) => setNewColor(e.target.value)}
                            />
                            <button onClick={() => mintToken()} className={`bg-gray-400 text-white hover:bg-purple-400 px-4 py-2`}>Mint</button>
                        </div>

                        <h4 className={`text-lg mt-6`}>Preview</h4>

                        <div className={`w-32 h-32 mx-2 rounded-full flex items-center justify-center`} style={{'background': newColor ? newColor : '#f2f2f2'}}><span className={`text-black text-center text-xs p-2 rounded-lg`} style={{background: 'rgba(255,255,255,0.8)'}}>{newColor ? newColor : '000000'}</span></div>       
                    </section>
                    <section className={`flex flex-col justify-center items-center mt-20`}>
                        <h3 className={`text-2xl text-gray-600`}>All Minted Awesome Tokens</h3>
                        <div className={`flex flex-row px-4 py-10 justify-center`}>
                            {
                                dataClient.mintedTokens.map((item)=>(
                                    <div className={`w-32 h-32 mx-2 rounded-full flex items-center justify-center`} style={{'background': item}}><span className={`text-black text-center text-xs p-2 rounded-lg`} style={{background: 'rgba(255,255,255,0.8)'}}>{item}</span></div>       
                                ))
                            }
                        </div>
                    </section> 
                </>
            )}
            {!isSupported && (
                <div className="w-full h-screen flex flex-col justify-center items-center font-mono">
                    <p className="text-lg text-gray-200 text-center mb-4">Your browser not support this Dapp.</p>
                    <iframe src="https://giphy.com/embed/JEVqknUonZJWU" width="480" height="231" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/force-awakens-behindthescenes-JEVqknUonZJWU">via GIPHY</a></p>
                    <p className="text-gray-200">Pleace install <a className="text-pink-400" href="https://metamask.io/">Metamask</a></p>
                </div>
            )}
        </main>
    )
}

export default Home;
