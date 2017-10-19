

#Create a Secret that holds your authorization token

#### Create a Secret named regsecret:
```
kubectl create secret docker-registry regsecret --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>
```
##### where:
```
<your-registry-server> is your Private Docker Registry FQDN.
<your-name> is your Docker username.
<your-pword> is your Docker password.
<your-email> is your Docker email.
```

#### Understanding your Secret

To understand what’s in the Secret you just created, start by viewing the Secret in YAML format:
```
kubectl get secret regsecret --output=yaml
```