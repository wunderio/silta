#!/bin/bash

if [ "$#" -ne 2 ]; then
    echo -e "Usage: $0 filename prefix"
    exit 1
fi

filename="$1"
prefix="$2"

# Check if the specified file exists
if [ ! -f "$filename" ]; then
    echo "Error: File '$filename' does not exist."
    exit 1
fi

# Check if the corresponding .pass file exists
passfile="${prefix}.pass"
if [ ! -f "$passfile" ]; then
    echo "Error: Pass file '$passfile' does not exists. Create a password file [prefix].pass and put there password for decoding PFX file (f.ex. mysite.pass)"
    exit 1
fi

openssl pkcs12 -legacy -in "$filename" -nocerts -nodes -password "file:$prefix.pass" | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > "${prefix}_private.key"
openssl pkcs12 -legacy -in "$filename" -cacerts -nokeys -password "file:$prefix.pass" | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > "${prefix}_ca.crt"
openssl pkcs12 -legacy -in "$filename" -clcerts -nokeys -password "file:$prefix.pass" | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > "${prefix}_root.crt"

openssl x509 -in "${prefix}_root.crt" -noout -startdate -enddate

sed -ne 's/^\( *\)[Ss]ubject[=:] */  \1/p;/X509v3 Subj.*Alt.*Name/{
    N;s/^.*\n//;:a;s/^\( *\)\(.*\), /\1\2\n\1/;ta;p;q; }' < <(
    openssl x509 -in "${prefix}_root.crt" -noout -subject -ext subjectAltName)

echo -e "\n--------------------------\n";
echo -e "Put this under ssl:\n"
echo -e "      key: |"
key_content=$(<"${prefix}_private.key")
key_indented_content=$(echo "$key_content" | sed "s/^/        /")
echo "$key_indented_content"

echo -e "      crt: |"
root_content=$(<"${prefix}_root.crt")
root_indented_content=$(echo "$root_content" | sed "s/^/        /")
echo "$root_indented_content"
ca_content=$(<"${prefix}_ca.crt")
ca_indented_content=$(echo "$ca_content" | sed "s/^/        /")
echo "$ca_indented_content"
