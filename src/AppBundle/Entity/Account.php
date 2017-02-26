<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\ArrayCollection;
    use AppBundle\Entity\GenericEntity;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="accounts",
     *      uniqueConstraints={@ORM\UniqueConstraint(name="accounts_name_unique",columns={"name"})})
     * @ORM\HasLifecycleCallbacks
     */
    class Account extends GenericEntity{
        /**
         * @ORM\Id
         * @ORM\Column(type="integer", nullable=false)
         * @ORM\GeneratedValue(strategy="IDENTITY")
         */
        protected $id;

        /**
         * @ORM\Column(type="string")
         */
        protected $name;

        /**
         * @ORM\Column(type="string")
         */
        protected $description;

        /**
         * @ORM\OneToMany(targetEntity="AccountSheet", mappedBy="account")
         * @var AccountSheet[]
         */
        protected $accountSheets;

        public function __construct($name = null, $description = null){
            $this->accountSheets = new ArrayCollection();
            $this->name = $name;
            $this->description = $description;
        }

        public function getAccountSheets(){
            return $this->accountSheets;
        }

        public function getId(){
            return $this->id;
        }

        public function getName(){
            return $this->name;
        }

        public function getDescription(){
            return $this->description;
        }

        public function setId($id){
            $this->id = $id;
            return $this;
        }

        public function setDescription($str){
            $this->description = $str;
            return $this;
        }

        public function setName($name){
            $this->name = $name;
            return $this;
        }

        public function __destruct(){}
    }
