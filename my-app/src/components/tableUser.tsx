import { User } from "@/db/models/users";
import { useEffect, useState } from "react";

export default function TableUser({ user }: { user: User }) {
  const [id, setId] = useState(user._id.toString());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setId(user._id.toString());
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPosition(user.position);
    setPhone(user.phone);
    setEmail(user.email);
  }, []);

  return (
    <>
      <tr className="">
        <td hidden={true}>
          <input type="hidden" value={id} name="userId" />
        </td>
        <td>
          <input
            type="text"
            value={firstName ?? "error"}
            name="firstName"
            onChange={(event) => setFirstName(event.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            name="position"
            value={position}
            onChange={(event) => setPosition(event.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </td>
      </tr>
    </>
  );
}
