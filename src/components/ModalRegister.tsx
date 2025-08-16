import { useState } from "react";
export default function ModalRegister() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [buyBottle, setBuyBottle] = useState(false);
  const [buyShoes, setBuyShoes] = useState(false);
  const [buyCap, setBuyCap] = useState(false);

  // ทำการรตรวจสอบความถูกต้องของข้อมูลต่าง ๆ
  const [fnameError, setFnameError] = useState(false); //เช็คเพียงว่าได้กรอกเข้ามาหรือเปล่า
  const [lnameError, setLnameError] = useState(false); //เช็คเพียงว่าได้กรอกเข้ามาหรือเปล่า (เหมือน First name)
  const [planError, setPlanError] = useState(false); //เช็คเพียงว่าได้เลือกแผนการวิ่งไหม
  const [genderError, setGenderError] = useState(false); //เช็คเพียงว่าได้เลือกเพศไหม
  const [isuserAgree, setIsUserAgree] = useState(false); //เช็คเพียงว่าได้กดยอมรับเงื่อนไขการสมัครไหม

  const inputFnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFname(event.target.value);

    // ตรวจสอบว่าได้กรอก First name หรือไม่
    setFnameError(false);
  };

  const inputLnameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLname(event.target.value);

    // ตรวจสอบว่าได้กรอก Last name หรือไม่
    setLnameError(false);
  };

  const selectPlanOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPlan(event.target.value);

    // ตรวจสอบว่าได้เลือกแผนการวิ่งหรือไม่
    setPlanError(false)
  };

  const radioGenderMaleOnChange = () => {
    setGender("male");

    // ตรวจสอบว่าได้เลือกเพศชายหรือไม่
    setGenderError(false);
  };

  const radioGenderFemaleOnChange = () => {
    setGender("female");

    // ตรวจสอบว่าได้เลือกเพศหญิงหรือไม่
    setGenderError(false);
  };

  // Checkbox สำหรับการยอมรับเงื่อนไขการสมัคร
  const checkboxUserAgreeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsUserAgree(event.target.checked);
  };

  const cbBuyBottleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyBottle(event.target.checked);
    // console.log("Bottle checked:", event.target.checked);
    // console.log("Total Payment:", computeTotalPayment());
  };

  const cbBuyShoesOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyShoes(event.target.checked);
    // console.log("Shoes checked:", event.target.checked);
    // console.log("Total Payment:", computeTotalPayment());
  };

  const cbBuyCapOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBuyCap(event.target.checked);
    // console.log("Cap checked:", event.target.checked);
    // console.log("Total Payment:", computeTotalPayment());
  };

  //ทำการคำนวณยอดรวมการชำระเงิน
  const computeTotalPayment = () => {
    let total = 0;
    if(plan === "funrun") total += 500;
    if(plan === "mini") total += 800;
    if(plan === "half") total += 1200;
    if(plan === "full") total += 1500;
    // Extra Items นำมาเพิ่มยอดรวม
    if(buyBottle) total += 200;
    if(buyShoes) total += 600;
    if(buyCap) total += 400;

    // เพิ่มการคำนวณของส่วนลด 20% ถ้าเลือก Extra Items ทั้งหมด
    if (buyBottle && buyShoes && buyCap) total -= 240;
  

    return total;
  };

  const registerBtnOnClick = () => {
    // ตรวจสอบความถูกต้องของข้อมูล
    let fnameok = true;
    let lnameok = true;
    let planok = true;
    let genderok = true;
    
    // ตรวจสอบ First name
    if (fname === "") {
      setFnameError(true);
      fnameok = false;
    }

    // ตรวจสอบ Last name
    if (lname === "") {
      setLnameError(true);
      lnameok = false;
    }

    // ตรวจสอบแผนการวิ่ง
    if (plan === "") {
      setPlanError(true);
      planok = false;
    }

    // ตรวจสอบเพศ
    if (gender === "") {
      setGenderError(true); 
      genderok = false;
    }

    // ตรวจสอบการยอมรับเงื่อนไขการสมัครทั้งหมด
    if (fnameok && lnameok && planok && genderok) {
    alert(`Registration complete. Please pay money for ${computeTotalPayment().toLocaleString()} THB.`);
    }
    
  };

  return (
    <div
      className="modal fade"
      id="modalregister" //id="modalregister": ตัวระบุของ modal (ใช้กับ data-bs-target หน้า HomePage)
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* First name & Last name */}
            <div className="d-flex gap-2">
              <div>
                <label className="form-label">First name</label>
                <input
                  type="text" /*กำหนดให้เป็นช่องกรอกข้อความ*/ 
                  className={"form-control" + (fnameError ? " is-invalid" : "")}
                  onChange={inputFnameOnChange}
                  value={fname}
                />
                <div className="invalid-feedback">Invalid first name</div>
              </div>
              <div>
                <label className="form-label">Last name</label>
                <input
                  type="text" /*กำหนดให้เป็นช่องกรอกข้อความ*/
                  className={"form-control" + (lnameError ? " is-invalid" : "")}
                  onChange={inputLnameOnChange}
                  value={lname}
                />
                <div className="invalid-feedback">Invalid last name</div>
              </div>
            </div>

            {/* Running Plan */}
            <div>
              <label className="form-label">Plan</label>
              {/* Fun run 5.5 Km (500 THB)
              Mini Marathon 10 Km (800 THB)
              Half Marathon 21 Km (1,200 THB)
              Full Marathon 42.195 Km (1,500 THB) */}
              <select className={"form-select" + (planError ? " is-invalid" : "")}
              onChange={selectPlanOnChange}
                value={plan}
                >
                <option value="">Please select..</option>
                <option value="funrun">Fun run 5.5 Km (500 THB)</option>
                <option value="mini">Mini Marathon 10 Km (800 THB)</option>
                <option value="half">Half Marathon 21 Km (1,200 THB)</option>
                <option value="full">Full Marathon 42.195 Km (1,500 THB)</option>
              </select>
              <div className="invalid-feedback">Please select a Plan</div>
            </div>

            {/* Gender */}
            <div>
              <label className="form-label">Gender</label>
              <div>
                <input
                name="gender" /* ใช้ name เพื่อให้ radio button ทำงานเป็นกลุ่มเดียวกัน */
                className="me-2 form-check-input" 
                type="radio" 
                onChange={radioGenderMaleOnChange}
                checked = {gender === "male"}
                />
                Male 👨
                <input 
                name="gender" /* ใช้ name เพื่อให้ radio button ทำงานเป็นกลุ่มเดียวกัน */
                className="mx-2 form-check-input" 
                type="radio" 
                onChange={radioGenderFemaleOnChange}
                checked = {gender === "female"}
                />
                Female 👩

                {/*ตรวจสอบว่าได้เลือกเพศหรือไม่ */}
                {genderError && <div className="text-danger">Please select gender</div>}
              </div>
            </div>

            {/* Extra Items */}
            <div>
              <label className="form-label">Extra Item(s)</label>
              <div>
                <input className="me-2 form-check-input" type="checkbox" 
                onChange={cbBuyBottleOnChange}
                checked={buyBottle}
                />
                <label className="form-check-label">Bottle 🍼 (200 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" 
                onChange={cbBuyShoesOnChange}
                checked={buyShoes}
                />
                <label className="form-check-label">Shoes 👟 (600 THB)</label>
              </div>
              <div>
                <input className="me-2 form-check-input" type="checkbox" 
                onChange={cbBuyCapOnChange}
                checked={buyCap}
                />
                <label className="form-check-label">Cap 🧢 (400 THB)</label>
              </div>

              {/* ตรวจสอบว่าได้เลือก Extra Items ทั้งหมดหรือไม่ */}
              {buyCap && buyShoes && buyBottle && (<span className="text-success d-block">(20% Discounted)</span>)}

              {/* Promotion Alert */}
              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>
            </div>

            {/* Total Payment */}
            <div >Total Payment : ... {computeTotalPayment().toLocaleString()} THB</div>
          </div>
          <div className="modal-footer">
            {/* Checkbox for user agreement */}
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                onChange={checkboxUserAgreeOnChange}
                checked={isuserAgree}
              />
              <label className="form-check-label">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Register Button */}
            <button 
            type="button" 
            className="btn btn-success"
            onClick={registerBtnOnClick}
            disabled={!isuserAgree} // ปุ่มจะถูกปิดใช้งานถ้าไม่ได้กดยอมรับเงื่อนไข

            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
