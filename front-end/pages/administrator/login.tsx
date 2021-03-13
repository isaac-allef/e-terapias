import MyInput from "../../components/MyInput";
import MyTitle from "../../components/MyTitle";

export default function Login() {
  return (
      <>
        <MyTitle>Login</MyTitle>
        <MyInput placeholder="Email" ></MyInput>
        <MyInput placeholder="Password" password={true} ></MyInput>
      </>
  )
}
