import React from 'react';
import './CompanyInformation.css'

const CompanyInformation = () => {

    
    return (
        <div className="companyInfoWrapper">
            <div className= "customLoginBox">
                    <p className="companyInfo">Company Information</p>

                <form className='loginForm'>
                    <div>
                        <label htmlFor="name" className=' ForPF comInfoPadding'>Company Name </label> <br/>
                        <input type="text" id="name" className="fadeIn companyInfoInput" width='787px' name="login" placeholder="Eco ocus"/>
                    </div>
                    <div>
                        <label htmlFor="address" className=' comInfoPadding'>Address </label> <br/>
                        <input type="text" id="address" className="fadeIn companyInfoInput" name="login" placeholder="Riyadh,Saudi Arabia"/>
                    </div>
                    <div>
                        <label htmlFor="email" className=' comInfoPadding'>Email </label> <br/>
                        <input type="text" id="email" className="fadeIn companyInfoInput" name="login" placeholder="abc@example.com"/>
                    </div>
                    <div>
                        <label htmlFor="phone" className=' comInfoPadding'>Landline</label> <br/>
                        <input type="number" id="phone" className="fadeIn companyInfoInput" name="login" placeholder="345634636"/>
                    </div>

                    <div className='d-flex'>
                        <div>
                            <label htmlFor="CRNum" className=' comInfoPadding'>CR Number </label> <br/>
                            <input type="number" id="CRNum" className="compInfoD1P1 dividedBox1" name="password" placeholder="•••••••"/>
                        </div>
                        <div>
                            <label htmlFor="exDate" className='divideBox2label'>CR Expiry Date</label> <br/>
                            <input type="date" id="exDate" className="fadeIn dividedBox1 compInfoD2P2" name="password" placeholder="•••••••"/>
                        </div>
                    </div>
                    <div className='d-flex'>
                        <div>
                            <label htmlFor="Fax" className=' comInfoPadding'>Fax (Optional)</label> <br/>
                            <input type="number" id="Fax" className="fadeIn compInfoD1P1 dividedBox1 " name="password" placeholder="•••••••"/>
                        </div>
                        <div>
                            <label htmlFor="VR" className='divideBox2label'>VAT Registration Number</label> <br/>
                            <input type="number" id="VR" className="fadeIn compInfoD1P1 dividedBox1 compInfoD2P2" name="password" placeholder="•••••••"/>
                        </div>
                    </div>



                    <div>
                        <label htmlFor="text" className=' comInfoPadding'>Company Activities </label> <br/>
                        <textarea type="textarea  " id="text" rows="4" cols="50" className="fadeIn textArea compInfoTextBoxS" name="text" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."/>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default CompanyInformation;