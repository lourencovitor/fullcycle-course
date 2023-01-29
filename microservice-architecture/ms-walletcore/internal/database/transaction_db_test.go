package database

import (
	"database/sql"
	"testing"

	"github.com/lourencovitor/fc-ms-wallet/internal/entity"
	"github.com/stretchr/testify/suite"
)

type TransactionDBTestSuite struct {
	suite.Suite
	db            *sql.DB
	client        *entity.Client
	client2       *entity.Client
	accountFrom   *entity.Account
	accountTo     *entity.Account
	transactionDb *TransactionDB
}

func (t *TransactionDBTestSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	t.Nil(err)
	t.db = db
	db.Exec("CREATE TABLE clients (id varchar(255), name varchar(255), email varchar(255), created_at date)")
	db.Exec("CREATE TABLE accounts (id varchar(255), client_id varchar(255), balance int, created_at date)")
	db.Exec("CREATE TABLE transactions (id varchar(255), account_id_from varchar(255), account_id_to varchar(255), amount int, created_at date)")

	// Clients
	client, err := entity.NewClient("Bruno", "bruno@bruno.com")
	t.Nil(err)
	t.client = client
	client2, err := entity.NewClient("Bruno Ramos", "bruno2@bruno.com")
	t.Nil(err)
	t.client2 = client2

	//Accounts
	accountFrom := entity.NewAccount(t.client)
	accountFrom.Balance = 1000
	t.accountFrom = accountFrom
	accountTo := entity.NewAccount(t.client2)
	accountTo.Balance = 1000
	t.accountTo = accountTo

	t.transactionDb = NewTransactionDB(db)
}
func (s *TransactionDBTestSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("Drop table clients")
	s.db.Exec("Drop table accounts")
	s.db.Exec("Drop table transactions")
}

func TestTransactionDbTest(t *testing.T) {
	suite.Run(t, new(TransactionDBTestSuite))
}

func (t *TransactionDBTestSuite) TestCreate() {
	transaction, err := entity.NewTransaction(t.accountFrom, t.accountTo, float64(500))
	t.Nil(err)

	err = t.transactionDb.Create(transaction)
	t.Nil(err)
}
