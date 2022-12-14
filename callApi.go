package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type TokenBody struct {
	Status bool   `json:"status"`
	Token  string `json:"token"`
}

func main() {

	fmt.Println("call API")
	var jsonStr = []byte(`{"appid":"01","username":"admin","password":"cdss123"}`)
	fmt.Println(jsonStr)
	url := "http://192.168.33.142:9876/DmscAuthorization/api/v1/login"
	fmt.Println(url)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	if err != nil {
		fmt.Println(err)
	}
	req.Header.Add("Content-Type", "application/json;charset=UTF-8")
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		fmt.Println(err)
	}
	defer res.Body.Close()

	body, readErr := ioutil.ReadAll(res.Body)
	if readErr != nil {
		fmt.Println(readErr)
	}
	fmt.Println(string(body))
	var getTokens TokenBody
	json.Unmarshal([]byte(string(body)), &getTokens)
	fmt.Println(getTokens.Status)

	s := strings.Split(string(body), ".")

	sDec, _ := base64.StdEncoding.DecodeString(s[1])
	fmt.Println(string(sDec))
}

// package main

// import (
// 	"bytes"
// 	"encoding/base64"
// 	"encoding/json"
// 	"fmt"
// 	"io/ioutil"
// 	"net/http"
// 	"strings"
// )

// type TokenBody struct {
// 	Status bool   `json:"status"`
// 	Token  string `json:"token"`
// }

// func main() {
// 	println("call api")
// 	var jsonStr = []byte(`{"appid":"01","username":"admin","password":"cdss123"}`)
// 	url := "http://192.168.33.142:9876/DmscAuthorization/api/v1/login"

// 	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
// 	if err != nil {
// 		fmt.Print(err.Error())
// 	}
// 	req.Header.Add("Content-Type", "application/json;charset=UTF-8")
// 	res, err := http.DefaultClient.Do(req)
// 	if err != nil {
// 		fmt.Print(err.Error())
// 	}
// 	defer res.Body.Close()
// 	body, readErr := ioutil.ReadAll(res.Body)
// 	if readErr != nil {
// 		fmt.Print(err.Error())
// 	}
// 	fmt.Println(string(body))

// 	var getToken TokenBody
// 	json.Unmarshal([]byte(string(body)), &getToken)

// 	fmt.Println(getToken.Status)

// 	s := strings.Split(string(body), ".")

// 	sDec, _ := base64.StdEncoding.DecodeString(s[1])
// 	fmt.Println(string(sDec))
// }
