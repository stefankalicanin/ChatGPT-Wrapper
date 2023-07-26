"""
Django command to wait for the db to be available
"""
import time

from psycopg2 import OperationalError as Psycopg20pError

from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """Django command to wait for DB"""

    def handle(self, *args, **options):
        self.stdout.write('Waiting for database...')
        db_up = False
        while db_up is False:
            try:
                self.check(databases=['default'])  # type: ignore
                db_up = True
            except (Psycopg20pError, OperationalError):
                self.stdout.write('Database unavailable')
                self.stdout.write('Waiting 1 second...')
                time.sleep(1)
        self.stdout.write(self.style.SUCCESS('DATABASE AVAILABLE'))
