import { useState } from 'react';
import './App.css';
import { MonacoEditor } from './components/MonacoEditor';
import { MermaidViewer } from './components/MermaidViewer';

// const DEFAULT_VALUE = `graph TD
//     A[Client] --> B[Load Balancer]
//     B --> C[Server01]
//     B --> D[Server02]
// `;

// const DEFAULT_VALUE = `architecture-beta
//     group api(cloud)[API]
//
//     service db(database)[Database] in api
//     service disk1(disk)[Storage] in api
//     service disk2(disk)[Storage] in api
//     service server(server)[Server] in api
//
//     db:L -- R:server
//     disk1:T -- B:server
//     disk2:T -- B:db
// `;

// const DEFAULT_VALUE = `pie title Pets adopted by volunteers
//     "Dogs" : 386
//     "Cats" : 85
//     "Rats" : 15
//    `;

// const DEFAULT_VALUE = `
// architecture-beta
//     group api(logos:aws-lambda)[API]
//
//     service db(logos:aws-aurora)[Database] in api
//     service disk1(logos:aws-glacier)[Storage] in api
//     service disk2(logos:aws-s3)[Storage] in api
//     service server(logos:aws-ec2)[Server] in api
//
//     db:L -- R:server
//     disk1:T -- B:server
//     disk2:T -- B:db
// `;

const DEFAULT_VALUE = `
    C4Context
      title System Context diagram for Internet Banking System
      Enterprise_Boundary(b0, "BankBoundary0") {
        Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")
        Person(customerB, "Banking Customer B")
        Person_Ext(customerC, "Banking Customer C", "desc")

        Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")

        System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

        Enterprise_Boundary(b1, "BankBoundary") {

          SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

          System_Boundary(b2, "BankBoundary2") {
            System(SystemA, "Banking System A")
            System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts. next line.")
          }

          System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")
          SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

          Boundary(b3, "BankBoundary3", "boundary") {
            SystemQueue(SystemF, "Banking System F Queue", "A system of the bank.")
            SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
          }
        }
      }

      BiRel(customerA, SystemAA, "Uses")
      BiRel(SystemAA, SystemE, "Uses")
      Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")
      Rel(SystemC, customerA, "Sends e-mails to")

      UpdateElementStyle(customerA, $fontColor="red", $bgColor="grey", $borderColor="red")
      UpdateRelStyle(customerA, SystemAA, $textColor="blue", $lineColor="blue", $offsetX="5")
      UpdateRelStyle(SystemAA, SystemE, $textColor="blue", $lineColor="blue", $offsetY="-10")
      UpdateRelStyle(SystemAA, SystemC, $textColor="blue", $lineColor="blue", $offsetY="-40", $offsetX="-50")
      UpdateRelStyle(SystemC, customerA, $textColor="red", $lineColor="red", $offsetX="-50", $offsetY="20")

      UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")



`;

const App = () => {
  const [text, setText] = useState<string | undefined>(DEFAULT_VALUE);

  const handleEditorChange = (value: string | undefined) => {
    setText(value);
  };

  return (
    <div>
      <h1>Mermaid Editor</h1>
      <div className="editor-container">
        <div className="monaco-editor">
          <MonacoEditor onChange={handleEditorChange} value={text} />
        </div>
        <div className="mermaid-viewer">
          <MermaidViewer>{`${text}`}</MermaidViewer>
        </div>
      </div>
    </div>
  );
};

export default App;
