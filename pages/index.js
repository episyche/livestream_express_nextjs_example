import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
      <div style={{ width: "full", height: "100vh", background: "whitesmoke" }}>
        <div style={{ width: "1100px", marginLeft: "auto", marginRight: "auto", paddingTop: "40px", }} >
          <div style={{ color: 'blue' }}>
            <Link href={"/videorecord"}>Video Recording </Link>
          </div>
          <br></br>
          <div style={{ color: 'blue' }}>
            <Link href={"/videostream"}>Video Streaming</Link>
          </div>
          <br></br>
          <div style={{ color: 'blue' }}>
            <Link href={"/live"}>Video Live Stream</Link>
          </div>
          <br></br>
          <div style={{ color: 'blue' }}>
            <Link href={"/livestream"}>Live Stream</Link>
          </div>
        </div>
      </div>
    </>
  )
}
