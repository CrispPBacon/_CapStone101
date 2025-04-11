import { IonIcon } from "@ionic/react";
import { checkmarkCircle, close } from "ionicons/icons";

export default function Approval() {
  return (
    <main>
      <header>
        <h1>Approval</h1>
      </header>
      <table className=" approval-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Allan Soriano</td>
            <td>
              <IonIcon
                icon={checkmarkCircle}
                style={{ color: "greenyellow" }}
              />
              <IonIcon icon={close} style={{ color: "red" }} />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
