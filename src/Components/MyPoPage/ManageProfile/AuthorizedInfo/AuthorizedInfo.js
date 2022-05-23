import React from 'react';
import './AuthorizedInfo.css'

const AuthorizedInfo = () => {
    return (
        <div className="companyInfoWrapper">
            <div className= "customLoginBox">
                <p className="companyInfo">Authorized Person’s Information</p>

                <form className='loginForm'>
                    <div>
                        <label htmlFor="name" className='emailLabelForAuthor comInfoPadding'>Name </label> <br/>
                        <input type="text" id="name" className="fadeIn companyInfoInput" width='787px' name="login" placeholder="Eco focus"/>
                    </div>
                    <div>
                        <label htmlFor="IDNum" className='emailLabelForAuthor comInfoPadding'>ID number </label> <br/>
                        <input type="number" id="IDNum" className="fadeIn companyInfoInput" name="IDNum" placeholder="2324523535"/>
                    </div>
                    <div>
                        <label htmlFor="Nationality" className='emailLabelForAuthor comInfoPadding'>Nationality </label> <br/>
                        <input type="text" id="Nationality" className="fadeIn companyInfoInput" name="Nationality" placeholder="Saudi"/>
                    </div>

                    <div>
                        <label  className='emailLabelForAuthor comInfoPadding'>Phone</label> <br/>
                        <input type="number" id="phone" className="fadeIn companyInfoInput" name="login" placeholder="345634636"/>
                    </div>
                    <div>
                        <label htmlFor="email" className='emailLabelForAuthor comInfoPadding'>Email </label> <br/>
                        <input type="text" id="email" className="fadeIn companyInfoInput" name="email" placeholder="abc@example.com"/>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default AuthorizedInfo;