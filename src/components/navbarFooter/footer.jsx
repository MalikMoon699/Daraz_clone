import React from "react";

const Footer = () => {
  return (
    <footer className="flex space-around">
      <div style={{overflow:"hidden"}}>
        <h4>Daraz International</h4>
        <ul className="flex national">
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/1fe7d756-2469-4d8e-82b2-d5eb7cbad875_PK-84-84.png" />{" "}
            <p>Pakistan</p>
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/05a4ef2c-095c-407d-9295-aa45b5412de0_PK-84-84.png" />{" "}
            <p>Bangladesh</p>
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/5536488d-c32a-44eb-8307-ed6651d907da_PK-84-84.png" />{" "}
            <p>Sri Lanka</p>
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/8896f696-b36f-4cb1-8576-2e86eed05046_PK-84-84.png" />{" "}
            <p>Myanmar</p>
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/39f7f111-619f-47cd-993c-a551aaed15fd_PK-86-86.png" />{" "}
            <p>Nepal</p>
          </li>
        </ul>
      </div>
      <div>
        <h4>Follow Us</h4>
        <ul className="flex social">
          <li className="flex">
            <img src="https://img.lazcdn.com/g/tps/imgextra/i3/O1CN01Wdetn224xMIRNihao_!!6000000007457-2-tps-34-34.png" />
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/77ab92ab-17ae-40ce-aa8b-e8de5974939d_PK-76-76.png" />
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/f03a43e7-3655-4049-8c12-b1614ac2a2d4_PK-75-76.png" />
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/6bf9555a-40ae-466d-a756-907f70aa3461_PK-76-76.png" />
          </li>
          <li className="flex">
            <img src="https://img.lazcdn.com/us/domino/cea1aedb-aa69-44d5-bbaf-ca5901797dea_PK-76-76.png" />
          </li>
        </ul>
      </div>
      <h4>© Daraz 2025</h4>
    </footer>
  );
};

export default Footer;
