# Setting Up AWS S3 Uploads with Adonis Filesystem

When deploying to systems like Heroku, the filesystem of your app is rebuilt every deployment and any time the server restarts or needs to scale (about every 2 hours on free accounts).
This means stored files like uploads can be lost frequently.

Luckily, there is a solution called Amazon S3 that allows for offsite, long term, reasonably priced storage.

Unfortunately, Amazon AWS (Amazon Web Services) can be a chore to figure out.
So, this guide is aimed at getting you through the signup process and get you uploading files to AWS!

# Signing Up and Credentials

To start, you will need to sign up for Amazon AWS at https://aws.amazon.com/.

After signing up and confirming you will need to get a set of credentials that will allow your app to connect to AWS services.
To start this process go to the IAM Console which allows you to manage access to your AWS services such as S3: https://console.aws.amazon.com/iam/home?#users

From the users page, click on "Create new User".
Fill out one of the inputs with your app's name and submit the form.
Click on the "Show Credentials" dropdown then:

* Copy the "Access Key ID" into your project's `.env` file as `S3_KEY` (ex `S3_KEY=AKIAIOSFODNN7EXAMPLE`).
* Copy the "Secret Access Key" into your project's `.env` file as `S3_SECRET` (ex `S3_SECRET=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`).
* Create values for `S3_REGION=us-east-1`

# Allowing the User to Manage S3

Now, you have a user with S3, but it is not allowed to do anything!
So, to fix this, go back to the Users page: https://console.aws.amazon.com/iam/home?#users
Click on your new user name, then click on the "Permissions" tab.
Here click on "Attach Policy".

Finally, search for and check the box for the policy "AmazonS3FullAccess" and attach this policy by clicking on the box in the bottom right.

# Setting Up the AWS CLI

Now you will need a way to create a storage bucket on S3.
While this can be done through the AWS website, I find it is easier to use the AWS CLI.
To install this on Mac run:

```bash
brew install awscli
```

Now you need to configure your credentials for AWS CLI:

```bash
aws configure
```

As the CLI asks for your "AWS Access Key ID" and "AWS Secret Access Key", copy the values from your `.env` file in your Adonis project.

# Creating a Bucket with the AWS CLI

Now the last AWS setup is to create your S3 bucket by running the command:

```bash
aws s3 mb s3://adonis-filesystem
```

Replace `adonis-filesystem` with your bucket name (usually best to match your app name).

Now for the last `.env` variable set `S3_BUCKET` to your bucket name (ex `S3_BUCKET=adonis-rtablada`).
