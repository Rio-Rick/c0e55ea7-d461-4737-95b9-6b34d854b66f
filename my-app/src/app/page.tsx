"use client";
import { useRouter } from "next/navigation";
import TableUser from "@/components/tableUser";
import { User, UserResponse } from "@/db/models/users";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<UserResponse<User[]>>();
  const [isLoading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [addUser, setAddUser] = useState(false);
  useEffect(() => {
    fetch("/api/users", { cache: "no-store" })
      .then((res) => res.json())
      .then((data: UserResponse<User[]>) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p className=" text-center">Loading...</p>;
  if (!data) return <p>No profile data</p>;
  const onSave = async (formData: FormData) => {
    setLoading(true);
    const newFirstName = formData.get("firstNameinput");
    const newLastName = formData.get("lastNameinput");
    const newPosition = formData.get("positioninput");
    const newPhone = formData.get("phoneinput");
    const newEmail = formData.get("emailinput");

    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      position: newPosition,
      phone: newPhone,
      email: newEmail,
    };
    if (
      newFirstName ||
      newLastName ||
      newPosition ||
      newPhone ||
      newEmail
    ) {
      await fetch("/api/users", {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    }
    const userId = formData.getAll("userId");
    const firstName = formData.getAll("firstName");
    const lastName = formData.getAll("lastName");
    const position = formData.getAll("position");
    const phone = formData.getAll("phone");
    const email = formData.getAll("email");
    for (let i = 0; i < userId.length; i++) {
      const user = {
        _id: userId[i],
        firstName: firstName[i],
        lastName: lastName[i],
        position: position[i],
        phone: phone[i],
        email: email[i],
      };
      await fetch("/api/users", {
        method: "put",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });
    }
    setLoading(false);
    location.reload();
  };
  return (
    <>
      <div className="flex justify-center">
        <form
          className="border-2 border-stone-950"
          action={onSave}
          encType="multipart/form-datas"
          method="put"
        >
          <button className="border-2 border-stone-950 p-2 m-2" type="submit">
            Save
          </button>
          <button
            type="button"
            className="border-2 border-stone-950 p-2 m-2"
            onClick={() => setAddUser(!addUser)}
          >
            Add
          </button>
          <table className=" border-2 w-10/12 p-2">
            <thead className="p-3">
              <tr className="border-2">
                <th>First Name</th>
                <th>Last Name</th>
                <th>Position</th>
                <th>Phone</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody className="p-4">
              {addUser ? (
                <tr className={addUser ? "" : "hidden"}>
                  <td>
                    <input
                      type="text"
                      required
                      value={firstName ?? ""}
                      name="firstNameinput"
                      onChange={(event) => setFirstName(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      name="lastNameinput"
                      value={lastName ?? ""}
                      onChange={(event) => setLastName(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      name="positioninput"
                      value={position ?? ""}
                      onChange={(event) => setPosition(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      required
                      name="phoneinput"
                      value={phone ?? ""}
                      onChange={(event) => setPhone(event.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      required
                      name="emailinput"
                      value={email ?? ""}
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </td>
                </tr>
              ) : (
                <></>
              )}
              {data.data?.map((user) => (
                <TableUser user={user} key={user._id.toString()} />
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}
