from custom_logger import logger
import boto3

cognito_client = boto3.client("cognito-idp")


@logger.inject_lambda_context(log_event=True)
def lambda_handler(event, context):
    """
    This function is used to pre-sign up a user.
    """

    # check if user already exists
    try:
        preferred_username = event["request"]["userAttributes"]["preferred_username"]
    
        response = cognito_client.list_users(
            UserPoolId=event["userPoolId"],
            AttributesToGet=["preferred_username"],
            Filter=f"preferred_username = '{preferred_username}'",
        )
    except Exception as e:
        logger.error(e)
        raise SomethingWentWrongException("Something went wrong")

    if len(response["Users"]) > 0:
        logger.info("User already exists")
        raise UsernameTakenException(f"Username {preferred_username} is already taken")

    return event

class UsernameTakenException(Exception):
    pass

class SomethingWentWrongException(Exception):
    pass
